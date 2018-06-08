import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Todo } from '../model/todo';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosUrl: string = '/api/todos';

  constructor(
    private http: HttpClient) { }

      /** GET todos from the server */
  getTodos (): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
      .pipe(
        tap(todos => console.log(`fetched todos`))
      );
  }

   /** GET todo by id. Will 404 if id not found */
   getTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get<Todo>(url).pipe(
      tap(_ => console.log(`fetched todo id=${id}`))
    );
  }

  /** POST: add a new todo to the server */
  addTodo (todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions).pipe(
      tap((todo: Todo) => console.log(`added todo w/ id=${todo.id}`))
    );
  }

  /** PUT: update the todo on the server */
  updateTodo (todo: Todo): Observable<any> {
    return this.http.put(`${this.todosUrl}/${todo.id}`, todo, httpOptions).pipe(
      tap(_ => console.log(`updated todo id=${todo.id}`))
    );
  }

  /** DELETE: delete the todo from the server */
  deleteTodo (todo: Todo | string): Observable<any> {
    const id = typeof todo === 'string' ? todo : todo.id;

    return this.http.delete<Todo>(`${this.todosUrl}/${id}`, httpOptions).pipe(
      tap(_ => console.log(`deleted todo id=${id}`))
    );
  }

}
