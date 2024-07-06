//package ru.kata.spring.boot_security.demo.controller;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.web.bind.annotation.*;
//import ru.kata.spring.boot_security.demo.model.User;
//
//@RestController
//@RequestMapping("/api/user")
//public class UserController {
//
//    @GetMapping()
//    public ResponseEntity<User> getUser(@AuthenticationPrincipal User user) {
//        return new ResponseEntity<User>(user, HttpStatus.OK);
//    }
//}
