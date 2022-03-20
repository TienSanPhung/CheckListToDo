import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {ToDoList} from "../models/ToDoList";

@Injectable(
  {providedIn:'root'}
)
export class ToDoListServiceService{
  Status: string[] = ['Done','UnDone'];

  todoListName:string[] = [
    "Học Angular 13",
    "Học ASP.NET Core",
    "Công Việc 1",
    "Công Việc 2",
    "Công Việc 3",
    "Công Việc 4",
    "Công Việc 5",
    "Công Việc 6"
  ]

  constructor(private http: HttpClient) { }

  getToDoList() {
    return this.http.get<any>('assets/task.json')
      .toPromise()
      .then(res => <ToDoList[]>res.data)
      .then(data => { return data; });
  }
  getToDo() {
    return this.http.get<any>('assets/task.json')
      .toPromise()
      .then(res => <ToDoList[]>res.data)
      .then(data => { return data; });
  }

  generateToDoList() : ToDoList{
    return {
      id: this.generateId(),
      name: this.generateName(),
      description: " mô tả công việc",
      status: this.generateStatus()
    };
  }
  generateId(){
    let id = "" ;
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id;
  }
  generateName() {
    return this.todoListName[Math.floor(Math.random() * Math.floor(30))];
  }
  generateStatus() {
    return this.Status[Math.floor(Math.random() * Math.floor(3))];
  }

}


