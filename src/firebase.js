import firebase from 'firebase/app';
import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAb3VOqPB4Gelu66KMNDokTVO1Egi410xs',
//   authDomain: 'contact-manager-b1725.firebaseapp.com',
//   projectId: 'contact-manager-b1725',
//   storageBucket: 'contact-manager-b1725.appspot.com',
//   messagingSenderId: '904869454890',
//   appId: '1:904869454890:web:4729c33777f3325fba8f53',
// };

const firebaseConfig = {
  apiKey: 'AIzaSyAAnxLfqJM_oR9ZDU6psW5IEN9F6HbhVfw',
  authDomain: 'g-login-196b7.firebaseapp.com',
  databaseURL: 'https://g-login-196b7-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'g-login-196b7',
  storageBucket: 'g-login-196b7.appspot.com',
  messagingSenderId: '545200038742',
  appId: '1:545200038742:web:c35af73fd150dd209eecf7',
};

const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
