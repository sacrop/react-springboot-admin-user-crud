package com.crudoperationtrial.crud.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.crudoperationtrial.crud.Model.User;
import com.crudoperationtrial.crud.repository.UserRepository;
import com.crudoperationtrial.crud.security.CustomUserDetail;

@Service
public class UserDetailsIService implements UserDetailsService {
    
    @Autowired
    private UserRepository userrepo;

    public UserDetailsIService(UserRepository userrepo) {
        this.userrepo = userrepo;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
       User user=userrepo.findByUserName(username);
       if(user!=null){
        return new CustomUserDetail(user);
       }
       else{
        throw new UsernameNotFoundException("User not found");
       }
        
    }
    
}
