package com.hahn.backend.controller;

import com.hahn.backend.dto.UserDto;
import com.hahn.backend.payload.response.DefaultResponse;
import com.hahn.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:4173"})
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<DefaultResponse<List<UserDto>>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        DefaultResponse<List<UserDto>> response = new DefaultResponse<>("Users retrieved successfully", true, users);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DefaultResponse<UserDto>> getUserById(@PathVariable Long id) {
        try {
            UserDto user = userService.getUserById(id);
            DefaultResponse<UserDto> response = new DefaultResponse<>("User retrieved successfully", true, user);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            DefaultResponse<UserDto> response = new DefaultResponse<>(e.getMessage(), false, null);
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<DefaultResponse<UserDto>> createUser(@Valid @RequestBody UserDto userDto) {
        try {
            UserDto createdUser = userService.createUser(userDto);
            DefaultResponse<UserDto> response = new DefaultResponse<>("User created successfully", true, createdUser);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            DefaultResponse<UserDto> response = new DefaultResponse<>(e.getMessage(), false, null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<DefaultResponse<UserDto>> updateUser(@PathVariable Long id, @Valid @RequestBody UserDto userDto) {
        try {
            UserDto updatedUser = userService.updateUser(id, userDto);
            DefaultResponse<UserDto> response = new DefaultResponse<>("User updated successfully", true, updatedUser);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            DefaultResponse<UserDto> response = new DefaultResponse<>(e.getMessage(), false, null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DefaultResponse<Object>> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            DefaultResponse<Object> response = new DefaultResponse<>("User deleted successfully", true, null);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            DefaultResponse<Object> response = new DefaultResponse<>(e.getMessage(), false, null);
            return ResponseEntity.badRequest().body(response);
        }
    }
}