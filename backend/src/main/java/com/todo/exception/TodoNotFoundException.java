// backend/src/main/java/com/todo/exception/TodoNotFoundException.java
package com.todo.exception;

public class TodoNotFoundException extends RuntimeException {
    public TodoNotFoundException(String message) {
        super(message);
    }
}
