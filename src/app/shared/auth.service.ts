import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './user.model';

interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
@Injectable()
export class AuthService {
     user = new BehaviorSubject<User | null>(null);
     isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(private route: Router, private http: HttpClient) {}
  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAw0uOhSke__lpvVwp9UPup01yYP6R23Os',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
  SignIn(email: string, password: string) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAw0uOhSke__lpvVwp9UPup01yYP6R23Os',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
