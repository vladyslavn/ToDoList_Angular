import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../objects/List';

@Injectable({
    providedIn: 'root'
})
export class ListService {
    private host = "http://localhost:8080";
    private httpOption = {
        headers: new HttpHeaders( {
            'Content-Type': 'application/json'
        })
    };

    constructor (private http: HttpClient) {}
    
    deleteListById(id): Observable<List> {
        const url = this.host + "/lists/" + id;
        return this.http.delete<List>(url);
    }

    createList(list): Observable<List> {
        const url = this.host + "/lists/";
        return this.http.post<List>(url, list, this.httpOption);
    }

    getLists(): Observable<List[]> {
        const url = this.host + "/lists/";
        return this.http.get<List[]>(url);
    }
}