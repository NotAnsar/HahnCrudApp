package com.hahn.backend.controller;

import com.hahn.backend.dto.UserDto;
import com.hahn.backend.payload.request.LoginRequest;
import com.hahn.backend.payload.request.RegisterRequest;
import com.hahn.backend.entity.User;
import com.hahn.backend.payload.response.AuthResponse;
import com.hahn.backend.payload.response.DefaultResponse;
import com.hahn.backend.repository.UserRepository;
import com.hahn.backend.security.JwtUtils;
import com.hahn.backend.security.UserPrincipal;
import com.hahn.backend.service.PasswordService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

// @CrossOrigin(origins = {"http://localhost:5173", "http://localhost:4173"})
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordService passwordService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<DefaultResponse<AuthResponse>> signin(@Valid @RequestBody LoginRequest request) {

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String token = jwtUtils.generateJwtToken(auth);
        UserPrincipal userDetails = (UserPrincipal) auth.getPrincipal();

        User user = userRepository.findByEmail(userDetails.getEmail()).orElseThrow();

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setRole(user.getRole());

        AuthResponse authResponse = new AuthResponse("Login successful", userDto, token);
        return ResponseEntity.ok(new DefaultResponse<>("Login successful", true, authResponse));
    }

    @PostMapping("/signup")
    public ResponseEntity<DefaultResponse<AuthResponse>> signup(@Valid @RequestBody RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new DefaultResponse<>("Email already exists", false, null));
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest()
                    .body(new DefaultResponse<>("Username already exists", false, null));
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordService.hashPassword(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole("USER");

        User savedUser = userRepository.save(user);

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String token = jwtUtils.generateJwtToken(auth);

        UserDto userDto = new UserDto();
        userDto.setId(savedUser.getId());
        userDto.setUsername(savedUser.getUsername());
        userDto.setEmail(savedUser.getEmail());
        userDto.setFirstName(savedUser.getFirstName());
        userDto.setLastName(savedUser.getLastName());
        userDto.setRole(savedUser.getRole());


        AuthResponse authResponse = new AuthResponse("User registered and logged in successfully", userDto, token);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new DefaultResponse<>("User registered and logged in successfully", true, authResponse));
    }
}