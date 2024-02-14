package com.crudoperationtrial.crud.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.crudoperationtrial.crud.Model.User;
import com.crudoperationtrial.crud.repository.UserRepository;
import com.crudoperationtrial.crud.service.JwtService;


@RestController
@RequestMapping("/")
public class UserController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepo;

    @GetMapping("/")
    public String getUser(){
        return "users home page";
    }
 

    @GetMapping("/profile")
    public ResponseEntity<User> getprofile(@RequestHeader("Authorization") String authorizationHeader){  
        String token=authorizationHeader.substring(7);
        String username=jwtService.extractUsername(token);
        User user=userRepo.findByUserName(username);
        return ResponseEntity.ok(user);
    }

    @PostMapping("uploadImage")
    public ResponseEntity<?> updateUserImage(@RequestParam("file") MultipartFile imgfile,@RequestParam("username")String username){
        try {
            String imagepath=imgfile.getOriginalFilename();
            File filestore = new File("src/main/resources/static/img/");
            if (!filestore.exists()) {
                filestore.mkdirs();
            }
            Path path = Paths.get(filestore.getAbsolutePath() + File.separator + imagepath);
            Files.copy(imgfile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            User user=userRepo.findByUserName(username);
            user.setImagepath(imagepath);
            userRepo.save(user);
            return ResponseEntity.ok("profile photo updated successfully");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
            // TODO: handle exception
        }
        

    }


    
}
