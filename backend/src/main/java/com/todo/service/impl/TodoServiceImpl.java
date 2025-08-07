// backend/src/main/java/com/todo/service/impl/TodoServiceImpl.java
package com.todo.service.impl;

import com.todo.dto.request.TodoRequest;
import com.todo.dto.response.TodoResponse;
import com.todo.entity.Todo;
import com.todo.entity.User;
import com.todo.exception.TodoNotFoundException;
import com.todo.repository.TodoRepository;
import com.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TodoServiceImpl implements TodoService {
    
    private final TodoRepository todoRepository;
    
    @Autowired
    public TodoServiceImpl(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<TodoResponse> getAllTodosByUser(User user) {
        List<Todo> todos = todoRepository.findByUserOrderByCreatedAtDesc(user);
        return todos.stream()
                   .map(TodoResponse::new)
                   .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<TodoResponse> getTodosByStatus(User user, Boolean completed) {
        List<Todo> todos = todoRepository.findByUserAndCompletedOrderByCreatedAtDesc(user, completed);
        return todos.stream()
                   .map(TodoResponse::new)
                   .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<TodoResponse> searchTodos(User user, String keyword) {
        List<Todo> todos = todoRepository.searchTodosByKeyword(user, keyword);
        return todos.stream()
                   .map(TodoResponse::new)
                   .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public TodoResponse getTodoById(Long id, User user) {
        Todo todo = todoRepository.findByIdAndUser(id, user)
                                 .orElseThrow(() -> new TodoNotFoundException("Todo not found with id: " + id));
        return new TodoResponse(todo);
    }
    
    @Override
    public TodoResponse createTodo(TodoRequest todoRequest, User user) {
        Todo todo = new Todo();
        todo.setTitle(todoRequest.getTitle());
        todo.setDescription(todoRequest.getDescription());
        todo.setCompleted(todoRequest.getCompleted());
        todo.setUser(user);
        
        Todo savedTodo = todoRepository.save(todo);
        return new TodoResponse(savedTodo);
    }
    
    @Override
    public TodoResponse updateTodo(Long id, TodoRequest todoRequest, User user) {
        Todo todo = todoRepository.findByIdAndUser(id, user)
                                 .orElseThrow(() -> new TodoNotFoundException("Todo not found with id: " + id));
        
        todo.setTitle(todoRequest.getTitle());
        todo.setDescription(todoRequest.getDescription());
        todo.setCompleted(todoRequest.getCompleted());
        
        Todo updatedTodo = todoRepository.save(todo);
        return new TodoResponse(updatedTodo);
    }
    
    @Override
    public TodoResponse toggleTodoStatus(Long id, User user) {
        Todo todo = todoRepository.findByIdAndUser(id, user)
                                 .orElseThrow(() -> new TodoNotFoundException("Todo not found with id: " + id));
        
        todo.setCompleted(!todo.getCompleted());
        Todo updatedTodo = todoRepository.save(todo);
        return new TodoResponse(updatedTodo);
    }
    
    @Override
    public void deleteTodo(Long id, User user) {
        Todo todo = todoRepository.findByIdAndUser(id, user)
                                 .orElseThrow(() -> new TodoNotFoundException("Todo not found with id: " + id));
        todoRepository.delete(todo);
    }
    
    @Override
    @Transactional(readOnly = true)
    public long getTodoCount(User user) {
        return todoRepository.countByUser(user);
    }
    
    @Override
    @Transactional(readOnly = true)
    public long getCompletedTodoCount(User user) {
        return todoRepository.countByUserAndCompleted(user, true);
    }
    
    @Override
    @Transactional(readOnly = true)
    public long getPendingTodoCount(User user) {
        return todoRepository.countByUserAndCompleted(user, false);
    }
}
