// backend/src/main/java/com/todo/service/impl/UserServiceImpl.java
package com.todo.service.impl;

import com.todo.dto.request.UserRequest;
import com.todo.dto.response.UserResponse;
import com.todo.entity.User;
import com.todo.exception.UserAlreadyExistsException;
import com.todo.exception.UserNotFoundException;
import com.todo.repository.UserRepository;
import com.todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Override
    public UserResponse createUser(UserRequest userRequest) {
        if (userRepository.existsByEmail(userRequest.getEmail())) {
            throw new UserAlreadyExistsException("User already exists with email: " + userRequest.getEmail());
        }
        
        User user = new User();
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setEmail(userRequest.getEmail());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        
        User savedUser = userRepository.save(user);
        return new UserResponse(savedUser);
    }
    
    @Override
    @Transactional(readOnly = true)
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                           .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
    }
    
    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserProfile(String email) {
        User user = findByEmail(email);
        return new UserResponse(user);
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
