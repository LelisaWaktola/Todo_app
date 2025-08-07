// backend/src/main/java/com/todo/service/UserService.java
package com.todo.service;

import com.todo.dto.request.UserRequest;
import com.todo.dto.response.UserResponse;
import com.todo.entity.User;

public interface UserService {
    
    UserResponse createUser(UserRequest userRequest);
    
    User findByEmail(String email);
    
    UserResponse getUserProfile(String email);
    
    boolean existsByEmail(String email);
}
