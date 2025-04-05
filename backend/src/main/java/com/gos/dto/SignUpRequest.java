package com.gos.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignUpRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private String name;

    @NotBlank
    @Email
    private String email;
} 