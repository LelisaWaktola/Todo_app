// backend/src/main/java/com/todo/exception/UserAlreadyExistsException.java
package com.todo.exception;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
