import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp } from "firebase/app";
import { routes } from './app.routes';
import { provideFirebaseApp } from '@angular/fire/app';
import { getAuth } from 'firebase/auth/web-extension';
import { provideAuth } from '@angular/fire/auth';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';




export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyDgaE0e5_WkGjVgaoLPjsH8uW1IDTR7blA",
    authDomain: "chuleton-f5b2b.firebaseapp.com",
    projectId: "chuleton-f5b2b",
    storageBucket: "chuleton-f5b2b.firebasestorage.app",
    messagingSenderId: "45594378368",
    appId: "1:45594378368:web:3160b6ded35c7dd1a7e665"
    })),
    provideAuth(() => getAuth()),
  ]
};

