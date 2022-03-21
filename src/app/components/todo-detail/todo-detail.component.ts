import { Component, OnInit,Input } from '@angular/core';
import {ToDoList} from "../../models/ToDoList";
import {ToDoListServiceService} from "../../service/to-do-list-service.service";
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {find} from "rxjs";

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
  styleUrls: ['./todo-detail.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class TodoDetailComponent implements OnInit {

  todoListDialog?: boolean ;

  todolists: ToDoList[] = [
    {id : "1",name:"Học Angular 13",description:"học trong 3 tuần",status:"unDone"},
    {id : "2",name:"Học ASP.NET core",description:"học trong 3 tuần",status:"unDone"},
    {id : "3",name:"Công Việc 1",description:"học trong 3 tuần",status:"unDone"},
    {id : "4",name:"Công Việc 2",description:"học trong 3 tuần",status:"unDone"},
    {id : "5",name:"Công Việc 3",description:"học trong 3 tuần",status:"unDone"}
  ];

  todo : ToDoList = {};

   selectedTask : ToDoList[] = [] ;

  submitted : boolean = false;
  Delete:any;
  statuses : any[] = [];


  constructor(public ToDoService: ToDoListServiceService,
              public messageService: MessageService,
              public confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    this.ToDoService.getToDoList().then(data => this.todolists = data);
    this.statuses = [
      {label: 'Done', value: 'done'},
      {label: 'UnDone', value: 'undone'}
    ];

  }

  openNew() {
    this.todo = {};
    this.submitted = false;
    this.todoListDialog = true;
  }
  deleteSelectedTD() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.todolists = this.todolists.filter(val => !this.selectedTask.includes(val));
        // this.selectedTask = null;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Task Deleted', life: 3000});
      }
    });
  }
  editTD(todolist: ToDoList) {
    this.todo = {...todolist};
    this.todoListDialog = true;
  }

  deleteToDo(ToDo: ToDoList) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + ToDo.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.todolists = this.todolists.filter(val => val.id !== ToDo.id);
        this.todo = {};
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Task Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.todoListDialog = false;
    this.submitted = false;
  }

  saveTD() {

    this.submitted = true;

  if(this.todo.id?.trim()) {
    if (this.findTDId(this.todo.id)) {
      this.todolists[this.findIndexById(this.todo.id)] = this.todo;
      this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Task Updated', life: 3000});
    } else {
      // this.todo.id = this.createId();
      this.todolists.push(this.todo);
      this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Task Created', life: 3000});
    }
    this.todolists = [...this.todolists];
    this.todoListDialog = false;
    this.todo = {};
  }

  }
  findTDId(id: string): boolean{

    for (let i = 0; i < this.todolists.length; i++) {
      if (this.todolists[i].id === id) {
        return true;
        break;
      }
    }

    return false;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.todolists.length; i++) {
      if (this.todolists[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
