package com.crudoperationtrial.crud.service;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.crudoperationtrial.crud.Model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private Claims extractAlClaims(String token){
        return Jwts
        .parser()
        .verifyWith(getSignKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();
    }
    public String extractUsername(String token){
        return extractAlClaims(token,Claims::getSubject);
    }

    public <T> T extractAlClaims(String token,Function<Claims,T> resolver){
        Claims claims=extractAlClaims(token);
        return resolver.apply(claims);
        
    }
    public boolean isValid(String token,UserDetails user){
        String username=extractUsername(token);
        return ((username.equals(user.getUsername()))&&!isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        // TODO Auto-generated method stub
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        // TODO Auto-generated method stub
        return extractAlClaims(token, Claims::getExpiration);
    }
    private final String SECRET_KEY="d5969c35987a6682d9d5ac9f0ef8a07c541ceab6eaef58b72af74641abd06155";
    public String generateToken(User user){
        String token=Jwts
                    .builder()
                    .subject(user.getUserName())
                    .issuedAt(new Date(System.currentTimeMillis()))
                    .expiration(new Date(System.currentTimeMillis()+24*60*60*1000))
                    .signWith(getSignKey())
                    .compact();

                    return token;
    }

    private SecretKey getSignKey(){

        byte[] keyBytes=Decoders.BASE64URL.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
}
