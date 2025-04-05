package com.gos.controller;

import com.gos.model.ServiceOrder;
import com.gos.service.ServiceOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/service-orders")
public class ServiceOrderController {

    @Autowired
    private ServiceOrderService serviceOrderService;

    @GetMapping
    public List<ServiceOrder> getAllServiceOrders() {
        return serviceOrderService.getAllServiceOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceOrder> getServiceOrderById(@PathVariable Long id) {
        Optional<ServiceOrder> serviceOrder = serviceOrderService.getServiceOrderById(id);
        return serviceOrder.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/machine/{machineId}")
    public List<ServiceOrder> getServiceOrdersByMachineId(@PathVariable Long machineId) {
        return serviceOrderService.getServiceOrdersByMachineId(machineId);
    }

    @PostMapping
    public ServiceOrder createServiceOrder(@RequestBody ServiceOrder serviceOrder) {
        return serviceOrderService.createServiceOrder(serviceOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteServiceOrder(@PathVariable Long id) {
        serviceOrderService.deleteServiceOrder(id);
        return ResponseEntity.noContent().build();
    }
}
