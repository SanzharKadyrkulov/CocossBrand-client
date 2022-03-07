import { collection } from 'firebase/firestore';
import { db } from './firebase';

export const dressRef = collection(db, 'dress');
export const orderRef = collection(db, 'order');
