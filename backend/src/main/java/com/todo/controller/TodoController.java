// backend/src/main/java/com/todo/controller/TodoController.java
package com.todo.controller;

import com.todo.dto.request.TodoRequest;
import com.todo.dto.response.TodoResponse;
import com.todo.entity.User;
import com.todo.service.TodoService;
import com.todo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {
    
    @Autowired
    private TodoService todoService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<TodoResponse>> getAllTodos(Principal principal) {
        User user = userService.findByEmail(principal.getName());
        List<TodoResponse> todos = todoService.getAllTodosByUser(user);
        return ResponseEntity.ok(todos);
    }
    
    @GetMapping("/pending")
    public ResponseEntity<List<TodoResponse>> getPendingTodos(Principal principal) {
        User user = userService.findByEmail(principal.getName());
        List<TodoResponse> todos = todoService.getTodosByStatus(user, false);
        return ResponseEntity.ok(todos);
    }
    
    @GetMapping("/completed")
    public ResponseEntity<List<TodoResponse>> getCompletedTodos(Principal principal) {
        User user = userService.findByEmail(principal.getName());
        List<TodoResponse> todos = todoService.getTodosByStatus(user, true);
        return ResponseEntity.ok(todos);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<TodoResponse>> searchTodos(
            @RequestParam String keyword, 
            Principal principal) {
        User user = userService.findByEmail(principal.getName());
        List<TodoResponse> todos = todoService.searchTodos(user, keyword);
        return ResponseEntity.ok(todos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TodoResponse> getTodoById(@PathVariable Long id, Principal principal) {
        User user = userService.findByEmail(principal.getName());
        TodoResponse todo = todoService.getTodoById(id, user);
        return ResponseEntity.ok(todo);
    }
    
    @PostMapping
    public ResponseEntity<TodoResponse> createTodo(
            @Valid @RequestBody TodoRequest todoRequest, 
            Principal principal) {
        User user = userService.findByEmail(principal.getName());
        TodoResponse createdTodo = todoService.createTodo(todoRequest, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTodo);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TodoResponse> updateTodo(
            @PathVariable Long id,
            @Valid @RequestBody TodoRequest todoRequest,
            Principal principal) {
        User user = userService.findByEmail(principal.getName());
        TodoResponse updatedTodo = todoService.updateTodo(id, todoRequest, user);
        return ResponseEntity.ok(updatedTodo);
    }
    
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<TodoResponse> toggleTodoStatus(@PathVariable Long id, Principal principal) {
        User user = userService.findByEmail(principal.getName());
        TodoResponse updatedTodo = todoService.toggleTodoStatus(id, user);
        return ResponseEntity.ok(updatedTodo);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id, Principal principal) {
        User user = userService.findByEmail(principal.getName());
        todoService.deleteTodo(id, user);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getTodoStats(Principal principal) {
        User user = userService.findByEmail(principal.getName());
        Map<String, Long> stats = new HashMap<>();
        stats.put("total", todoService.getTodoCount(user));
        stats.put("completed", todoService.getCompletedTodoCount(user));
        stats.put("pending", todoService.getPendingTodoCount(user));
        return ResponseEntity.ok(stats);
    }
}
