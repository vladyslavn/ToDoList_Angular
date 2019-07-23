import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private host = "http://localhost:3000";
    private httpOption = {
        headers: new HttpHeaders( {
            'Content-Type': 'application/json'
        })
    };

    constructor (private http: HttpClient) {}
    
    deleteTaskById(id) {
        const url = this.host + "/tasks/" + id;
        return this.http.delete(url);
    }

    createTask(task) {
        const url = this.host + "/tasks/";
        return this.http.post(url, task, this.httpOption);
    }

    updateTask(task) {
        const url = this.host + "/tasks/" + task.id;
        return this.http.put(url, task, this.httpOption);
    }

    getTasksByListId(id) {
        const url = this.host + "/tasks?parentId=" + id;
        return this.http.get(url, this.httpOption);
    }
}