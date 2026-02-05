package com.embediq.server.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {

    private String secret = "HereIsRandom32CharactersThatUsedAsSecret";

    public String ganarateToken(String email , String role){
        return Jwts.builder()
                .setSubject(email)
                .claim("role",role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000L * 7))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS256)
                .compact();

    }

    public Claims getClaims(String token){
         return  Jwts.parserBuilder()
                 .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes()))
                 .build()
                 .parseClaimsJws(token)
                 .getBody();
    }

}
