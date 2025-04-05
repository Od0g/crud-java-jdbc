package com.gos.service;

import com.gos.model.Machine;
import com.gos.repository.MachineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MachineService {

    private final MachineRepository machineRepository;

    public List<Machine> getAllMachines() {
        return machineRepository.findAll();
    }

    public Machine saveMachine(Machine machine) {
        return machineRepository.save(machine);
    }
}