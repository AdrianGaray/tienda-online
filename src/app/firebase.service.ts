import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

// creamos un servicio para configurar el acceso a firebase 
export class FirebaseService {

// Your web app's Firebase configuration
  firebaseConfig = {
    apiKey: "AIzaSyAetjUsz-M67TUJEFBrEaEXD2Bkqx9gy9A",
    authDomain: "tienda-online-91451.firebaseapp.com",
    databaseURL: "https://tienda-online-91451-default-rtdb.firebaseio.com",
    projectId: "tienda-online-91451",
    storageBucket: "tienda-online-91451.firebasestorage.app",
    messagingSenderId: "713898496570",
    appId: "1:713898496570:web:1a4ee352b415f8be5c9b03"
  };

  public auth: Auth;
  public firebase: Firestore;  

  constructor() {
    const app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(app);
    this.firebase = getFirestore(app);
   }
}
