import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  
  todos:Todo[];

  constructor(private todoService:TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos=>{
      this.todos = todos;
    });
  }

  deleteTodo(todo:Todo){
    //Remove from UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    //Remove from DB
    this.todoService.deleteTodo(todo).subscribe(todo => console.log('Deleted'))
  }

  addTodo(todo){
    this.todoService.addTodo(todo).subscribe(todo=>{
      console.log('Todo Added')
      this.todos.push(todo);
    })
  }
}
