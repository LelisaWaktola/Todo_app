// backend/src/main/java/com/todo/service/TodoService.java
package com.todo.service;

import com.todo.dto.request.TodoRequest;
import com.todo.dto.response.TodoResponse;
import com.todo.entity.User;
import java.util.List;

public interface TodoService {
    
    List<TodoResponse> getAllTodosByUser(User user);
    
    List<TodoResponse> getTodosByStatus(User user, Boolean completed);
    
    List<TodoResponse> searchTodos(User user, String keyword);
    
    TodoResponse getTodoById(Long id, User user);
    
    TodoResponse createTodo(TodoRequest todoRequest, User user);
    
    TodoResponse updateTodo(Long id, TodoRequest todoRequest, User user);
    
    TodoResponse toggleTodoStatus(Long id, User user);
    
    void deleteTodo(Long id, User user);
    
    long getTodoCount(User user);
    
    long getCompletedTodoCount(User user);
    
    long getPendingTodoCount(User user);
}
