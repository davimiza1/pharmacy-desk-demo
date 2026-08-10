export const today = () => new Date().toISOString().slice(0, 10);

export const addDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

export const money = (amount) =>
  `Rs ${Number(amount || 0).toLocaleString('en-PK')}`;

export const daysLeft = (date) =>
  Math.ceil((new Date(`${date}T00:00`) - new Date()) / 86_400_000);

export const invoiceTotal = (invoice) =>
  Math.max(
    0,
    invoice.items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.qty),
      0,
    ) - Number(invoice.discount || 0),
  );

export function completeSale(data, invoice) {
  for (const item of invoice.items) {
    const medicine = data.medicines.find((entry) => entry.id === item.id);
    if (!medicine || medicine.stock < item.qty) {
      throw new Error(`Insufficient stock for ${item.name}`);
    }
  }

  return {
    ...data,
    invoices: [invoice, ...data.invoices],
    medicines: data.medicines.map((medicine) => {
      const item = invoice.items.find((entry) => entry.id === medicine.id);
      return item ? { ...medicine, stock: medicine.stock - item.qty } : medicine;
    }),
    movements: [
      ...invoice.items.map((item) => ({
        id: `mv-${invoice.id}-${item.id}`,
        date: invoice.date,
        medicine: item.name,
        change: -item.qty,
        reason: invoice.id,
      })),
      ...data.movements,
    ],
  };
}

export function recordPurchase(data, purchase) {
  const medicine = data.medicines.find(
    (entry) => entry.id === purchase.medicineId,
  );
  if (!medicine) throw new Error('Medicine not found');
  if (purchase.qty <= 0 || purchase.cost < 0) {
    throw new Error('Purchase quantity and cost must be valid');
  }

  return {
    ...data,
    purchases: [purchase, ...data.purchases],
    medicines: data.medicines.map((entry) =>
      entry.id === purchase.medicineId
        ? {
            ...entry,
            stock: entry.stock + purchase.qty,
            cost: purchase.cost,
            batch: purchase.batch || entry.batch,
            expiry: purchase.expiry || entry.expiry,
          }
        : entry,
    ),
    movements: [
      {
        id: `mv-${purchase.id}`,
        date: purchase.date,
        medicine: medicine.name,
        change: purchase.qty,
        reason: `Purchase ${purchase.id}`,
      },
      ...data.movements,
    ],
  };
}
