package com.gos.service;

import com.gos.model.ServiceOrder;
import com.gos.repository.ServiceOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceOrderService {

    @Autowired
    private ServiceOrderRepository serviceOrderRepository;

    public List<ServiceOrder> getAllServiceOrders() {
        return serviceOrderRepository.findAll();
    }

    public Optional<ServiceOrder> getServiceOrderById(Long id) {
        return serviceOrderRepository.findById(id);
    }

    public List<ServiceOrder> getServiceOrdersByMachineId(Long machineId) {
        return serviceOrderRepository.findByMachineId(machineId);
    }

    public ServiceOrder createServiceOrder(ServiceOrder serviceOrder) {
        return serviceOrderRepository.save(serviceOrder);
    }

    public void deleteServiceOrder(Long id) {
        serviceOrderRepository.deleteById(id);
    }
}
