import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';



// const firebaseConfig = {
//     apiKey: "AIzaSyAQS62kfeXusqtOX9n-bVfwWK91pKoo_vA",
//     authDomain: "todolist-auth-7d93a.firebaseapp.com",
//     projectId: "todolist-auth-7d93a",
//     storageBucket: "todolist-auth-7d93a.appspot.com",
//     messagingSenderId: "56631687576",
//     appId: "1:56631687576:web:a96ec80b86d6ec0865d3ed",
// };

const firebaseConfig = {
    apiKey: "AIzaSyDGyLcg0eZ2vEqwXPn8248zy5rMWIUVrNQ",
    authDomain: "todolist-rework.firebaseapp.com",
    projectId: "todolist-rework",
    storageBucket: "todolist-rework.appspot.com",
    messagingSenderId: "410398533913",
    appId: "1:410398533913:web:7561dae181bf8c03387d88"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);