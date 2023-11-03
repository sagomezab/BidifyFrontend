import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subasta } from '../models/subasta';
import { Message } from '../models/message';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class SubastaService {

  subastaURL = 'http://bidifybackend.azurewebsites.net/subasta/';

  constructor(private httpClient: HttpClient) { }

  public createSubasta(subasta: Subasta): Observable<Subasta> {
    return this.httpClient.post<Subasta>(this.subastaURL, subasta);
  }

  public getAllSubastas(): Observable<Subasta[]> {
    return this.httpClient.get<Subasta[]>(this.subastaURL);
  }

  public getSubastaById(id: number): Observable<Subasta> {
    return this.httpClient.get<Subasta>(`${this.subastaURL}${id}`);
  }

  public addMessageToSubasta(subastaId: number, message: Message): Observable<Subasta> {
    
    return this.httpClient.post<Subasta>(`${this.subastaURL}${subastaId}/messages`, message);
  }

  public recibirPuja(subastaId: number, usuario: Usuario, oferta: number): Observable<Subasta> {
    return this.httpClient.post<Subasta>(`${this.subastaURL}${subastaId}/pujas`, { usuario, oferta });
  }

  public finalizarSubasta(subastaId: number): Observable<Subasta> {
    return this.httpClient.put<Subasta>(`${this.subastaURL}${subastaId}/finalizar`, null);
  }
  public getMessageList(subastaId: number): Observable<Message[]> {
    return this.httpClient.get<Message[]>(`${this.subastaURL}${subastaId}/messages`);
  }
  public actualizarSubasta(subastaId: number, subastaActualizada: Subasta): Observable<Subasta> {
    return this.httpClient.put<Subasta>(`${this.subastaURL}${subastaId}`, subastaActualizada);
  }
  
}