import test from 'node:test';
import assert from 'node:assert/strict';
import {
  completeSale,
  invoiceTotal,
  recordPurchase,
} from '../src/lib/pharmacy.js';

const base = () => ({
  medicines: [{ id: 'm1', name: 'Test Medicine', stock: 10, cost: 50, batch: 'B1', expiry: '2027-01-01' }],
  invoices: [],
  purchases: [],
  movements: [],
});

test('invoice total applies quantity and fixed discount', () => {
  const invoice = { items: [{ price: 100, qty: 3 }], discount: 25 };
  assert.equal(invoiceTotal(invoice), 275);
});

test('sale deducts stock exactly once and records movement', () => {
  const invoice = {
    id: 'INV-1', date: '2026-08-10', discount: 0,
    items: [{ id: 'm1', name: 'Test Medicine', qty: 2, price: 80 }],
  };
  const result = completeSale(base(), invoice);
  assert.equal(result.medicines[0].stock, 8);
  assert.equal(result.invoices.length, 1);
  assert.equal(result.movements[0].change, -2);
});

test('sale rejects a quantity greater than available stock', () => {
  const invoice = {
    id: 'INV-2', date: '2026-08-10', discount: 0,
    items: [{ id: 'm1', name: 'Test Medicine', qty: 11, price: 80 }],
  };
  assert.throws(() => completeSale(base(), invoice), /Insufficient stock/);
});

test('purchase increases stock and preserves traceability', () => {
  const purchase = {
    id: 'PUR-1', medicineId: 'm1', date: '2026-08-10', qty: 5,
    cost: 45, batch: 'B2', expiry: '2028-01-01', supplier: 'Supplier',
  };
  const result = recordPurchase(base(), purchase);
  assert.equal(result.medicines[0].stock, 15);
  assert.equal(result.medicines[0].batch, 'B2');
  assert.equal(result.movements[0].change, 5);
});
