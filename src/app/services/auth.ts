import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user } from '@angular/fire/auth';


// El AuthService es el servicio que gestiona toda la autenticación de usuarios en tu aplicación


@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable(); // estat reactiu del usuari

  constructor(private auth: Auth) {
    user(this.auth).subscribe(user => {
      this.currentUserSubject.next(user); //escolta canvis en l'estat d'autenticació i actualitza el subject
    });
  }

  register(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<any> {
    return signOut(this.auth);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }
}