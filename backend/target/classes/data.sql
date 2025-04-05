-- Inserir usuário desenvolvedor
MERGE INTO users (username, password, name, email, active)
KEY(username)
VALUES ('user', '$2a$10$GckdgpXzqXyJRzGqdkV4/.TfAqjC3kgXbZx1XUk1sAZgdPW5GZB3.', 'Desenvolvedor', 'dev@example.com', true);

-- Inserir role de desenvolvedor
MERGE INTO user_roles (user_id, role)
KEY(user_id, role)
SELECT id, 'DEVELOPER' FROM users WHERE username = 'user'; 