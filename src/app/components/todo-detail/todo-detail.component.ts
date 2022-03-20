import { Component, OnInit,Input } from '@angular/core';
import {ToDoList} from "../../models/ToDoList";
import {ToDoListServiceService} from "../../service/to-do-list-service.service";
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

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

  todoListDialog : boolean ;

  todoLists : ToDoList[] ;

  todo : ToDoList ;

  selectedTask :  ToDoList[] ;

  submitted : boolean;
  Delete:any;
  statuses : any[] = [];


  constructor(private ToDoService: ToDoListServiceService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.ToDoService.getToDoList().then(data => this.todoLists = data);
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
        this.todoLists = this.todoLists.filter(val => !this.selectedTask.includes(val));
        this.selectedTask = null;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
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
        this.todoLists = this.todoLists.filter(val => val.id !== ToDo.id);
        this.todo = {};
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.todoListDialog = false;
    this.submitted = false;
  }

  saveTD() {
    this.submitted = true;


    if (this.todo.name.trim()) {
      if (this.todo.id) {
        this.todoLists[this.findIndexById(this.todo.id)] = this.todo;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      }
      else {
        this.todo.id = this.createId();
        this.todoLists.push(this.todo);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
      }
      this.todoLists = [...this.todoLists];
      this.todoListDialog = false;
      this.todo = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.todoLists.length; i++) {
      if (this.todoLists[i].id === id) {
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
