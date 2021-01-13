import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAb3VOqPB4Gelu66KMNDokTVO1Egi410xs',
  authDomain: 'contact-manager-b1725.firebaseapp.com',
  projectId: 'contact-manager-b1725',
  storageBucket: 'contact-manager-b1725.appspot.com',
  messagingSenderId: '904869454890',
  appId: '1:904869454890:web:4729c33777f3325fba8f53',
};

const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
