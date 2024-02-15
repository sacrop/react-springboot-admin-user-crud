package com.crudoperationtrial.crud.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.crudoperationtrial.crud.service.JwtService;
import com.crudoperationtrial.crud.service.UserDetailsIService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{

    @Autowired
    private  JwtService jwtService; 

    @Autowired
    private  UserDetailsIService userDetailsImp;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, 
    @NonNull HttpServletResponse response, 
    @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader=request.getHeader("Authorization");

        if(authHeader==null||!authHeader.startsWith("Bearer")){
            filterChain.doFilter(request, response);
            return;
        }
        String token=authHeader.substring(7);
        String username=jwtService.extractUsername(token);

        if(username !=null && SecurityContextHolder.getContext().getAuthentication()==null){
            UserDetails userdetails=userDetailsImp.loadUserByUsername(username);
            
            if(jwtService.isValid(token, userdetails)){
                UsernamePasswordAuthenticationToken authToken=new UsernamePasswordAuthenticationToken(userdetails,null,userdetails.getAuthorities());
              
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
            
        }
        filterChain.doFilter(request, response);
        
        
    }
    
    
}
