package com.crudoperationtrial.crud.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.crudoperationtrial.crud.Dto.UserDto;
import com.crudoperationtrial.crud.Model.Role;
import com.crudoperationtrial.crud.Model.User;
import com.crudoperationtrial.crud.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void updateUserProfile(User user, UserDto userDto) throws Exception {
        if (!passwordEncoder.matches(userDto.getCurrentPassword(), user.getPassword())) {
            throw new Exception("password does not match");
        }
        String newpass=passwordEncoder.encode(userDto.getNewPassword());
        user.setPassword(newpass);
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setUserName(userDto.getUserName());
        if(userDto.getRole()!=null){
            user.setRole(userDto.getRole());
        }
        else{
            user.setRole(Role.USER);
        }   
        userRepo.save(user);
          
    }

    public void deleteUserById(Integer id) {
        userRepo.deleteById(id);
    }

    

   
}

    
