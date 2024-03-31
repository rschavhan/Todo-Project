import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from '../todo.services';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      const newTodo: Todo = {
        id: 0, // The actual ID will be set in the service
        title: this.newTodoTitle.trim(),
        completed: false
      };
      this.todoService.addTodo(newTodo);
      this.newTodoTitle = '';
      this.todos = this.todoService.getTodos(); // Refresh todo list
    }
  }

  updateTodoStatus(todo: Todo): void {
    this.todoService.updateTodo(todo);
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
    this.todos = this.todoService.getTodos(); // Refresh todo list
  }
}
