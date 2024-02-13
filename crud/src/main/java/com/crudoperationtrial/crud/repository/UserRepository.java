package com.crudoperationtrial.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crudoperationtrial.crud.Model.User;
import java.util.Optional;



public interface UserRepository extends JpaRepository<User,Integer> {

    public User findByUserName(String userName);

    public boolean existsByUserName(String userName);

    public Optional<User> findById(Integer id);
    
}
