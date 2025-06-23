package com.hahn.backend.payload.response;

import com.hahn.backend.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class AuthResponse {
    private String message;
    private UserDto user=null;
    private String token;
    private boolean success = true;

    public AuthResponse(String message, UserDto user, String token) {
        this.message = message;
        this.user = user;
        this.token = token;
    }

}