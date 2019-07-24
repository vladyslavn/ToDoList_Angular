import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';

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
    
    deleteListById(id) {
        const url = this.host + "/lists/" + id;
        return this.http.delete(url);
    }

    createList(list) {
        const url = this.host + "/lists/";
        return this.http.post(url, list, this.httpOption);
    }

    getLists() {
        const url = this.host + "/lists/";
        return this.http.get(url, this.httpOption);
    }
}