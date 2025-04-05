package com.gos.model;

import jakarta.persistence.*;

@Entity
public class Machine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String model;
    private String manufacturer;
    
    // Getters and Setters
}