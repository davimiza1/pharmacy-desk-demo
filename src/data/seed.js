import { addDays } from '../lib/pharmacy.js';

export const seed = {
  medicines: [
    { id: 'm1', name: 'Panadol 500mg', generic: 'Paracetamol', barcode: '8964000123456', batch: 'PN-2407', expiry: addDays(420), cost: 26, price: 35, stock: 85, min: 20, unit: 'Strip', supplier: 'HealthCare Distributors' },
    { id: 'm2', name: 'Augmentin 625mg', generic: 'Co-amoxiclav', barcode: '8964000789012', batch: 'AG-1182', expiry: addDays(75), cost: 345, price: 410, stock: 9, min: 10, unit: 'Pack', supplier: 'City Medicine Supply' },
    { id: 'm3', name: 'Brufen 400mg', generic: 'Ibuprofen', barcode: '8964000456123', batch: 'BR-992', expiry: addDays(18), cost: 42, price: 55, stock: 24, min: 12, unit: 'Strip', supplier: 'HealthCare Distributors' },
    { id: 'm4', name: 'Risek 20mg', generic: 'Omeprazole', barcode: '8964000321654', batch: 'RK-401', expiry: addDays(190), cost: 135, price: 165, stock: 6, min: 10, unit: 'Pack', supplier: 'Metro Pharma' },
    { id: 'm5', name: 'Calpol Syrup 120ml', generic: 'Paracetamol syrup', barcode: '8964000876543', batch: 'CP-330', expiry: addDays(12), cost: 175, price: 215, stock: 14, min: 6, unit: 'Bottle', supplier: 'City Medicine Supply' },
  ],
  suppliers: [
    { id: 's1', name: 'HealthCare Distributors', phone: '0300 1112233', due: 18500 },
    { id: 's2', name: 'City Medicine Supply', phone: '0321 4445566', due: 9200 },
    { id: 's3', name: 'Metro Pharma', phone: '0333 7778899', due: 0 },
  ],
  invoices: [],
  purchases: [],
  movements: [],
};
