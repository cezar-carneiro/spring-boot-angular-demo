import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from '../../model/todo';

@Component({
  selector: 'add-todo-modal',
  templateUrl: './add-todo-modal.component.html',
  styleUrls: ['./add-todo-modal.component.css']
})
export class AddTodoModalComponent {

  @Input() todo: Todo; 

  constructor(public activeModal: NgbActiveModal) { }
}
