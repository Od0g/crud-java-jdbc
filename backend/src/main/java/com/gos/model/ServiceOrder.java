package com.gos.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class ServiceOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private Machine machine;
    
    private Date openingDate;
    private Date closingDate;
    private MaintenanceType type;
    
    // Getters and Setters
}