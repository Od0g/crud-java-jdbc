package com.gos;

import com.gos.service.UserService;
import com.gos.dto.SignUpRequest;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GosApplication {
    public static void main(String[] args) {
        SpringApplication.run(GosApplication.class, args);
    }

    @Bean
    public CommandLineRunner initData(UserService userService) {
        return args -> {
            // Criar usuário inicial
            SignUpRequest admin = new SignUpRequest();
            admin.setUsername("admin");
            admin.setPassword("admin123");
            admin.setName("Administrador");
            admin.setEmail("admin@gos.com");
            
            try {
                userService.registerUser(admin);
                System.out.println("Usuário inicial criado com sucesso!");
            } catch (Exception e) {
                System.out.println("Erro ao criar usuário inicial: " + e.getMessage());
            }
        };
    }
}