import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { getBaseApiUrl } from '../constants/api-url';

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${getBaseApiUrl()}/contact`;

  constructor(private http: HttpClient) { }

  sendMessage(message: ContactMessage): Observable<ContactMessage> {
    return this.http.post<ContactMessage>(this.apiUrl, message);
  }

  getMessages(token: string): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(this.apiUrl, {
      headers: { 'x-api-key': token }
    });
  }

  deleteMessage(id: string, token: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: { 'x-api-key': token }
    });
  }
}
