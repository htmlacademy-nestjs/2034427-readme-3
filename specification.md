### Запуск проэкта

1. Сколонировать проэкт
2. Перейти в директорию с проектом
```bash
cd project
```
3. Установить зависимости
```bash
npm install
```
4. Переименовать ".env" файлы
```bash
cp ./apps/accounts/.accounts.env-example ./apps/accounts/.accounts.env
cp ./apps/blog/.blog.env-example ./apps/blog/.blog.env
cp ./apps/gateway/.gateway.env-example ./apps/gateway/.gateway.env
cp ./apps/notify/.notify.env-example ./apps/notify/.notify.env
cp ./apps/uploader/.uploader.env-example ./apps/uploader/.uploader.env
cp ./libs/models/blog-models/src/prisma/.env.example ./libs/models/blog-models/src/prisma/.env
```
5. Сгенерировать PrismaClient
```bash
nx run blog:db:generate
```
7. Накотить миграции
```bash
nx run blog:db:migrate
```
8. Запустить Docker окружения
```bash
docker compose --file ./apps/notify/docker-compose.dev.yml up -d
docker compose --file ./apps/accounts/docker-compose.dev.yml up -d
docker compose --file ./apps/blog/docker-compose.dev.yml up -d
```
9. Запустить сервисы
```bash
nx run notify:serve
nx run accounts:serve
nx run blog:serve
nx run uploader:serve
nx run gateway:serve
```
или запустить сразу все сервисы
```bash
nx run-many --target=serve --all --parallel=10
```

### Запуск линтеров
1. Отдельно для каждого сервиса
```bash
nx run accounts:lint
nx run blog:lint
nx run notify:lint
nx run uploader:lint
nx run gateway:lint
```
2. Сразу весь проект, включая библиотеки
```bash
nx run-many --target=lint
```
