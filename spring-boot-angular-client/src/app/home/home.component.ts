import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Todo } from '../model/todo';
import { TodoService } from '../services/todo.service';
import { AddTodoModalComponent } from '../modals/add-todo-modal/add-todo-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todos: Todo[];

  errorMsg: string;

  constructor(private todosService: TodoService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todosService.getTodos().subscribe(todos => this.todos = todos);
  }

  openAddTodoModal(): void {
    const modalRef = this.modalService.open(AddTodoModalComponent);
    modalRef.componentInstance.todo = new Todo();
    modalRef.result.then(t => {
      if(t){
        this.todosService.addTodo(t).subscribe(
          () => {
            this.errorMsg = null;
            this.getTodos();
          },
          err => this.errorMsg = err.error.message);
      }
    });
    
  }
  
  onTodoStatusChanged(todo: Todo, status: boolean): void{
    todo.done = status;
    console.log(`Todo "${todo.description}" changed to ${status}`);
    
    this.todosService.updateTodo(todo).subscribe(
      () => this.getTodos(),
      err => this.errorMsg = err.error.message);
  }
  
  onEditTodo(todo: Todo): void {
    const modalRef = this.modalService.open(AddTodoModalComponent);
    modalRef.componentInstance.todo = todo;
    modalRef.result.then(t => {
      if(t){
        this.todosService.updateTodo(t).subscribe(() => {});
      }
    });
    
  }
  
  onDeleteTodo(todo: Todo): void {
    console.log(`Clicked to delete "${todo.description}".`);

    this.todosService.deleteTodo(todo).subscribe(
      () => this.getTodos(),
      err => this.errorMsg = err.error.message);
  }

}
