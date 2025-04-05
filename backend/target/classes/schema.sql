-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    active BOOLEAN DEFAULT true
);

-- Tabela de roles dos usuários
CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL,
    role VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, role),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabela de máquinas
CREATE TABLE IF NOT EXISTS machines (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    model VARCHAR(100),
    serial_number VARCHAR(100),
    manufacturer VARCHAR(100),
    purchase_date DATE,
    status VARCHAR(50),
    location VARCHAR(100),
    notes TEXT
);

-- Tabela de manutenções
CREATE TABLE IF NOT EXISTS maintenances (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    machine_id BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    description TEXT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    technician VARCHAR(100),
    cost DECIMAL(10,2),
    FOREIGN KEY (machine_id) REFERENCES machines(id)
);

-- Tabela de peças
CREATE TABLE IF NOT EXISTS parts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    unit VARCHAR(20),
    price DECIMAL(10,2),
    location VARCHAR(100),
    minimum_quantity INT
);

-- Tabela de uso de peças em manutenções
CREATE TABLE IF NOT EXISTS maintenance_parts (
    maintenance_id BIGINT NOT NULL,
    part_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (maintenance_id, part_id),
    FOREIGN KEY (maintenance_id) REFERENCES maintenances(id),
    FOREIGN KEY (part_id) REFERENCES parts(id)
);

-- Tabela de ordens de serviço
CREATE TABLE IF NOT EXISTS service_orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    machine_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    priority VARCHAR(50),
    created_date TIMESTAMP,
    completed_date TIMESTAMP,
    assigned_to VARCHAR(100),
    FOREIGN KEY (machine_id) REFERENCES machines(id)
); 