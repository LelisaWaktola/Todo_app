// backend/src/main/java/com/todo/repository/TodoRepository.java
package com.todo.repository;

import com.todo.entity.Todo;
import com.todo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    
    List<Todo> findByUserOrderByCreatedAtDesc(User user);
    
    List<Todo> findByUserAndCompletedOrderByCreatedAtDesc(User user, Boolean completed);
    
    @Query("SELECT t FROM Todo t WHERE t.user = :user AND " +
           "(LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Todo> searchTodosByKeyword(@Param("user") User user, @Param("keyword") String keyword);
    
    Optional<Todo> findByIdAndUser(Long id, User user);
    
    long countByUser(User user);
    
    long countByUserAndCompleted(User user, Boolean completed);
}
