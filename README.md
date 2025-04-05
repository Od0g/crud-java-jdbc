# GOS - Sistema de Gerenciamento de Manutenção e Ordens de Serviço

![GOS Logo](frontend/public/logo.png)

## 📋 Sobre o Projeto

O GOS (Gerenciamento de Ordens de Serviço) é uma aplicação desenvolvida para o gerenciamento completo de manutenções e ordens de serviço. A aplicação permite o controle de máquinas, manutenções preventivas e corretivas, gerenciamento de peças, custos e relatórios.

## 🚀 Funcionalidades

- **Dashboard**: Visualização rápida de métricas importantes como máquinas cadastradas, manutenções pendentes e custos totais
- **Cadastro de Máquinas**: Gestão completa do parque de máquinas
- **Ordens de Serviço**: Criação e acompanhamento de manutenções preventivas e corretivas
- **Inventário de Peças**: Controle de estoque de peças utilizadas em manutenções
- **Gestão de Custos**: Acompanhamento de custos com mão de obra, peças e outros
- **Relatórios**: Geração de relatórios para análise de desempenho

## 🛠️ Tecnologias Utilizadas

### Backend
- **Java 17**
- **Spring Boot**
- **Spring Security com JWT**
- **Spring Data JPA**
- **H2 Database** (desenvolvimento)
- **MySQL** (produção)

### Frontend
- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Shadcn/UI**
- **React Query**
- **Recharts** para visualização de dados
- **Framer Motion** para animações

## 📦 Instalação e Uso

### Pré-requisitos
- Java 17+
- Node.js 18+
- NPM/Yarn
- Maven
- MySQL (opcional para produção)

### Configuração do Backend

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Instale as dependências e compile:
```bash
mvn clean install
```

3. Execute o servidor:
```bash
mvn spring-boot:run
```

O backend estará disponível em `http://localhost:8081`

### Configuração do Frontend

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 🔒 Segurança

O sistema utiliza autenticação baseada em JWT (JSON Web Token) para proteger as rotas e endpoints. Um usuário padrão é criado na primeira execução:

- **Usuário**: admin@example.com
- **Senha**: password

## 📱 Imagens do Sistema

![Dashboard](docs/screenshots/dashboard.png)
![Máquinas](docs/screenshots/machines.png)
![Ordem de Serviço](docs/screenshots/service-order.png)

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests. 