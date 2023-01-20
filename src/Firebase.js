import firebase from 'firebase/compat/app';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCE-GgCZvZne29vNE94r-nXj6c-1htJzhw",
  authDomain: "wechat-1c9fe.firebaseapp.com",
  projectId: "wechat-1c9fe",
  storageBucket: "wechat-1c9fe.appspot.com",
  messagingSenderId: "835212860832",
  appId: "1:835212860832:web:de620d197b3149f57e18c5",
  measurementId: "G-H44ZNE4MHK"
};

const app = firebase.initializeApp(firebaseConfig);
// const db = app.firestore()
export default app
export const storage = getStorage(app);
