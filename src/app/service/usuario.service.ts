import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl = "http://bidifybackend.azurewebsites.net";

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Usuario[]>(this.baseUrl + "/user/getall")
  }

  adduser(user: Usuario): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/user/add", user);
  }

  getUserByUsername(username: any) {
    return this.httpClient.get<Usuario>(this.baseUrl + "/user/getbyusername/" + username)
  }
}
