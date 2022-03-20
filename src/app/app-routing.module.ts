import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {TodoAddComponent} from "./components/todo-add/todo-add.component";
import {TodoDetailComponent} from "./components/todo-detail/todo-detail.component";




const routes: Routes = [
  { path: '',redirectTo: '/main',pathMatch:'full'},
  {path:'main', component: MainComponent},
  {path:'add', component: TodoAddComponent},
  {path:'todo/:id',component:TodoDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
