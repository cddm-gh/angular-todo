import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url:string = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http:HttpClient) { }

  //Get all todos
  getTodos():Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.url}?_limit=10`);
  }

  //Toggle completed of todo
  toggleCompleted(todo:Todo):Observable<any>{
    const url = `${this.url}/${todo.id}`; 
    return this.http.put<Todo>(url, todo, httpOptions);
  }

  //Delete todo
  deleteTodo(todo:Todo):Observable<Todo>{
    const url = `${this.url}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  //Add new todo
  addTodo(todo:Todo):Observable<Todo>{
    return this.http.post<Todo>(this.url,todo,httpOptions);
  }
}
