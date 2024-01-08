
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAEi2vYx1I-9-C6EIwot1ZqR_vA2dWuopY",
    authDomain: "typeit-1551a.firebaseapp.com",
    projectId: "typeit-1551a",
    storageBucket: "typeit-1551a.appspot.com",
    messagingSenderId: "342323060572",
    appId: "1:342323060572:web:fb16d609a34e9fc21b6b99"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)


