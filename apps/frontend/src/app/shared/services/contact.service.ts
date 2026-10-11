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
}
