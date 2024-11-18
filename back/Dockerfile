# установка ОС с node.js (первичный образ)
FROM node:19.5.0-alpine

# дериктория где будет лежать наше приложение  
WORKDIR /app

# копирование конфигурационных файлов для приложения (зависимости node.js)
COPY package*.json ./

# установка зависимостей
RUN npm install

# копирование файлов приложения
COPY . .

# установка ORM prisma глабально 
RUN npm install -g prisma

# генерация экземпляра prisma
RUN prisma generate

# копирование схемы prisma
COPY prisma/schema.prisma ./prisma/

# открыть порт в нашем контейнере
EXPOSE 3000

# запуск сервера (нашего приложения)
CMD [ "npm", "start" ]




# команда для создания образа:
# docer build -t <name container> .