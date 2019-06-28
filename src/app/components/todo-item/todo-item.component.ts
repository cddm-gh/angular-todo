import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo:Todo;
  @Output() deleteTodo:EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit() {
  }

  //Set dynamic classes
  setClasses(){
    let classes = {
      //name of class: if condition is valid
      todo: true,
      'is-complete': this.todo.completed
    }

    return classes;
  }

  //checkbox toggle
  onToggle(todo:Todo){
    todo.completed = !todo.completed;
    this.todoService.toggleCompleted(todo).subscribe(todo=>{
      console.log(todo);
    });
  }

  //button delete click
  onDelete(todo:Todo){
    //emitt the event upward to Todos component
    this.deleteTodo.emit(todo);
  }
}
