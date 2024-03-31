import { Injectable } from '@angular/core';
import { Todo } from './models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosKey = 'todos';

  constructor() { }

  getTodos(): Todo[] {
    return JSON.parse(localStorage.getItem(this.todosKey) || '[]');
  }

  addTodo(todo: Todo): void {
    const todos = this.getTodos();
    todo.id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    todos.push(todo);
    localStorage.setItem(this.todosKey, JSON.stringify(todos));
  }

  updateTodo(todo: Todo): void {
    const todos = this.getTodos();
    const index = todos.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      todos[index] = todo;
      localStorage.setItem(this.todosKey, JSON.stringify(todos));
    }
  }

  deleteTodo(id: number): void {
    let todos = this.getTodos();
    todos = todos.filter(todo => todo.id !== id);
    localStorage.setItem(this.todosKey, JSON.stringify(todos));
  }
}
