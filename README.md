# User Service API

REST API сервис управления пользователями на Node.js, TypeScript, Express и PostgreSQL.

### Технологии

- Node.js, TypeScript, Express
- PostgreSQL, TypeORM
- JWT аутентификация
- Zod валидация
- bcrypt для хеширования паролей
- Pino логирование
- Docker, Docker Compose


### Функционал

- Модель пользователя:
  - fullName
  - birthDate
  - email (уникальный)
  - password
  - role (admin или user)
  - isActive (статус блокировки)
- Регистрация, логин, обновление токена
- Получение пользователя по ID (сам пользователь или админ)
- Получение списка пользователей (только админ)
- Блокировка (сам себя или админ) и разблокировка (админ)
- Health-check


### Эндпоинты

- POST /v1/auth/register — регистрация
- POST /v1/auth/login — вход
- POST /v1/auth/refresh — обновление access токена
- GET /v1/users/:id — получить пользователя по id
- GET /v1/users — список пользователей
- PUT /v1/users/:id/block — блокировка пользователя
- DELETE /v1/users/:id/block — разблокировка пользователя
- GET /v1/health — проверка статуса сервиса


### Запуск в Docker

```shell
- cp .env.example .env
- docker compose up -d
```

- API: http://localhost:3000
- Swagger UI: http://localhost:8080

### TODO:

- [ ] Рефакторинг
- [ ] Экспорт всех DTO из единой точки shared
- [ ] Инвалидация токенов
- [ ] Передавать Refresh-токены в HTTP-Only Cookie
- [ ] User Agent Fingerprinting, IP Address Binding
- [ ] Хранить данные по токенам в Redis
