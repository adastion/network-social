# Используем образ linux Alpine с node 20
FROM node:19.5.0-alpine 

# Указываем нашу рабочую деректорию
WORKDIR /app

# Скопировать package.json и package-lock.json внутрь контейнера
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем оставшееся приложение в контейнер
COPY . .

# установка Prisma
RUN npm install -g prisma

# Генерируем Prisma client
RUN prisma generate

# Копируем Prisma schema
COPY prisma/schema.prisma ./prisma/

# Открыть порт в нашем контейнере
EXPOSE 3000

# Старт сервер
CMD ["npm", "start"]