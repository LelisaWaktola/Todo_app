// backend/src/main/java/com/todo/controller/UserController.java
package com.todo.controller;

import com.todo.dto.response.UserResponse;
import com.todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getUserProfile(Principal principal) {
        UserResponse userResponse = userService.getUserProfile(principal.getName());
        return ResponseEntity.ok(userResponse);
    }
}
