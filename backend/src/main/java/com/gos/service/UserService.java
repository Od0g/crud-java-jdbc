package com.gos.service;

import com.gos.dto.SignUpRequest;
import com.gos.model.User;
import com.gos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(SignUpRequest signUpRequest) {
        // Verificar se o username já existe
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new RuntimeException("Username já está em uso!");
        }

        // Verificar se o email já existe
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Email já está em uso!");
        }

        // Criar novo usuário
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        
        // Definir roles padrão
        HashSet<String> roles = new HashSet<>();
        roles.add("USER");
        user.setRoles(roles);

        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
} 