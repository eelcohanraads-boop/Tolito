import type { ShoppingItem } from '../types/shopping';

export const initialShopping: ShoppingItem[] = [
{ id: 's1', name: 'Milk', store: 'Albert Heijn', recurring: true, needed: true, bought: false },
{ id: 's2', name: 'Bananas', store: 'Albert Heijn', recurring: true, needed: true, bought: false },
{ id: 's3', name: 'Coffee beans', store: 'Albert Heijn', recurring: false, needed: true, bought: false },
{ id: 's4', name: 'Sourdough bread', store: 'Bakker Bart', recurring: true, needed: true, bought: false },
{ id: 's5', name: 'Dishwasher tablets', store: 'Kruidvat', recurring: false, needed: true, bought: false },
{ id: 's6', name: 'Dog food', store: 'Pets Place', recurring: false, needed: true, bought: false },
{ id: 's7', name: 'Tomatoes', store: null, recurring: false, needed: true, bought: false },
{ id: 's8', name: 'Eggs', store: 'Albert Heijn', recurring: true, needed: false, bought: true },
{ id: 's9', name: 'Toilet paper', store: 'Albert Heijn', recurring: false, needed: false, bought: false },
{ id: 's10', name: 'Cheese', store: 'Albert Heijn', recurring: true, needed: false, bought: false },
{ id: 's11', name: 'Shampoo', store: 'Kruidvat', recurring: false, needed: false, bought: false },
{ id: 's12', name: 'Light bulbs', store: 'Action', recurring: false, needed: false, bought: false },
{ id: 's13', name: 'Croissants', store: 'Bakker Bart', recurring: false, needed: false, bought: false }];