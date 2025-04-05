package com.gos.controller;

import com.gos.model.Machine;
import com.gos.service.MachineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/machines")
@RequiredArgsConstructor
public class MachineController {

    private final MachineService machineService;

    @GetMapping
    public ResponseEntity<List<Machine>> getAllMachines() {
        return ResponseEntity.ok(machineService.getAllMachines());
    }

    @PostMapping
    public ResponseEntity<Machine> createMachine(@RequestBody Machine machine) {
        return ResponseEntity.ok(machineService.saveMachine(machine));
    }
}