import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


export  default defineNuxtPlugin((nuxtApp)=>{
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY, 
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  };
  const app =   initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore(app)

  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);
  nuxtApp.vueApp.provide('db', db);
  nuxtApp.provide('db', db);
})
