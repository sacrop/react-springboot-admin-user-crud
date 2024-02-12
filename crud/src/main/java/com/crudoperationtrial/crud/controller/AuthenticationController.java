package com.crudoperationtrial.crud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.crudoperationtrial.crud.Model.User;
import com.crudoperationtrial.crud.service.AuthenticationService;

@RestController
public class AuthenticationController {


    @Autowired
    private AuthenticationService authservice;

    public AuthenticationController(AuthenticationService authservice){
        this.authservice=authservice;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
        @RequestBody User request
    ){
            try {
                return ResponseEntity.ok(authservice.register(request));
            } catch (Exception e) {
                // TODO Auto-generated catch block
                return ResponseEntity.badRequest().body(e.getMessage());
            }
    } 

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User request){
        try {
            return ResponseEntity.ok(authservice.authenticate(request));
        }
        catch(BadCredentialsException bd){
            return ResponseEntity.badRequest().body("Invalid username or password");
        }
         catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    
}
