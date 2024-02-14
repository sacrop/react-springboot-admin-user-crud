package com.crudoperationtrial.crud.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.crudoperationtrial.crud.Model.AuthenticationResponse;
import com.crudoperationtrial.crud.Model.Role;
import com.crudoperationtrial.crud.Model.User;
import com.crudoperationtrial.crud.repository.UserRepository;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    // public AuthenticationService(UserRepository userRepo, PasswordEncoder passwordEncoder, JwtService jwtService) {
    //     this.userRepo = userRepo;
    //     this.passwordEncoder = passwordEncoder;
    //     this.jwtService = jwtService;
    // }
    public AuthenticationResponse register(User request) throws Exception{
        if(userRepo.existsByUserName(request.getUserName())){
            throw new Exception("username already exist");
        }
        User user=new User();
        user.setPhoneNumber(request.getPhoneNumber()); 
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUserName(request.getUserName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole() != null ? request.getRole() : Role.USER);
        user=userRepo.save(user);
        String token=jwtService.generateToken(user);
        return new AuthenticationResponse(token,user.getRole().name());
    }
    
    public AuthenticationResponse authenticate(User request){
                authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword()));
            User user=userRepo.findByUserName(request.getUserName());
            String token=jwtService.generateToken(user);
            return new AuthenticationResponse(token,user.getRole().name());
    }
    
}
