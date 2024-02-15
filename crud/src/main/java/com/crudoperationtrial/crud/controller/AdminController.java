package com.crudoperationtrial.crud.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.crudoperationtrial.crud.Dto.UserDto;
import com.crudoperationtrial.crud.Model.Role;
import com.crudoperationtrial.crud.Model.User;
import com.crudoperationtrial.crud.repository.UserRepository;
import com.crudoperationtrial.crud.service.AuthenticationService;
import com.crudoperationtrial.crud.service.JwtService;
import com.crudoperationtrial.crud.service.UserService;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationService authservice;

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
    @PostMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestBody UserDto userDto) {
        try {
            User user=userRepo.findById(userDto.getId()).orElseThrow(()-> new RuntimeException("user not found"));
            userService.updateUserProfile(user,userDto);
            // Perform any necessary logic with the user object
            return ResponseEntity.ok("successfully updated user details");
        } catch (Exception e) {
            // Handle exceptions
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody User request){
        try {
            authservice.register(request);
            return ResponseEntity.ok("successfull creation");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/uploadImage")
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
        }
    }

    @DeleteMapping("deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id")Integer id){
        try {
            userService.deleteUserById(id);
            return ResponseEntity.ok("delete successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/updateProfile")
    public ResponseEntity<?> updateProfile(@RequestBody UserDto userDto){
        try {
            User user=userRepo.findById(userDto.getId()).orElseThrow(()-> new RuntimeException("user not found"));
            userDto.setRole(Role.ADMIN);
            userService.updateUserProfile(user,userDto);
            return ResponseEntity.ok("successfully updated user details");
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
