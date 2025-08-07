// backend/src/main/java/com/todo/exception/UserNotFoundException.java
package com.todo.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
