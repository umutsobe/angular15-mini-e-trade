import { initializeApp } from 'firebase/app';

export const environment = {};

export const firebaseConfig = {
  apiKey: 'AIzaSyBVvQgxWhbHVJVc34Fjb8lHSc9mV7suJsQ',
  authDomain: 'shoppappfirebase-cc9a2.firebaseapp.com',
  databaseURL: 'https://shoppappfirebase-cc9a2-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'shoppappfirebase-cc9a2',
  storageBucket: 'shoppappfirebase-cc9a2.appspot.com',
  messagingSenderId: '342427961509',
  appId: '1:342427961509:web:5de7629233e19a8797e54c',
};
const app = initializeApp(firebaseConfig);
