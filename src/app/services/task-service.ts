import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Task } from '../objects/Task';
import { TransferState } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private host = "http://localhost:8080";
    private httpOption = {
        headers: new HttpHeaders( {
            'Content-Type': 'application/json'
        })
    };

    constructor (private http: HttpClient) {}
    
    deleteTask(task): Observable<Task> {
        const url = this.host + "/tasks/" + task.id;
        return this.http.delete<Task>(url);
    }

    createTask(task): Observable<Task> {
        const url = this.host + "/tasks/";
        return this.http.post<Task>(url, task, this.httpOption);
    }

    updateTask(task): Observable<Task> {
        const url = this.host + "/tasks/";
        return this.http.put<Task>(url, task, this.httpOption);
    }

    getTasksByListId(id): Observable<Task[]> {
        const url = this.host + "/tasks/" + id;
        return this.http.get<Task[]>(url, this.httpOption);
    }

}