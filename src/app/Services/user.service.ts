import { Injectable } from '@angular/core';
import { User } from '../Models/iuser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // L'attribut contenant l'API
    private apiUrl: string = "http://localhost/api_user/api_user/api.php";


    constructor(private http: HttpClient) { }

    // Récupérer tous les utilisateurs
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    // Récupérer un utilisateur par ID
    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}?id=${id}`);
    }

    // Ajouter un utilisateur
    addUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiUrl, user);
    }

    // Mettre à jour un utilisateur
    updateUser(user: User): Observable<User> {
        return this.http.put<User>(this.apiUrl, user);
    }


    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}?id=${id}`);
    }

    // Inscription (Register)
    register(user: any): Observable<any> {
        // user doit contenir : { pseudo: '...', email: '...', password: '...' }
        return this.http.post(this.apiUrl, user);
    }

    // Méthode de Connexion
    login(credentials: any): Observable<any> {
        // credentials doit être : { email: '...', password: '...' }
        return this.http.post(`${this.apiUrl}?action=login`, credentials);
    }
}
