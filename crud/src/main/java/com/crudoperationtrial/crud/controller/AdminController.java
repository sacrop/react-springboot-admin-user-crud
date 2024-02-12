package com.crudoperationtrial.crud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crudoperationtrial.crud.Model.User;
import com.crudoperationtrial.crud.repository.UserRepository;
import com.crudoperationtrial.crud.service.JwtService;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepo;

    @GetMapping("/")
    public String homeAdmin(){
        return "admin home page";
    }    

    @GetMapping("/profile")
    public ResponseEntity<User> adminprofile(@RequestHeader("Authorization") String authorizationHeader){
        String token=authorizationHeader.substring(7);
        String username=jwtService.extractUsername(token);
        User user=userRepo.findByUserName(username);
        return ResponseEntity.ok(user);
    }  
    @GetMapping("/getUser")
    public ResponseEntity<List<User>> getUsers(){
        List<User> userlist=userRepo.findAll();
        return ResponseEntity.ok(userlist);
        
    }
}
