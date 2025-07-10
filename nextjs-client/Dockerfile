# Этап 1: Сборка production-артефактов
FROM node:22.17.0-alpine AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Активируем corepack для управления версией Yarn
RUN corepack enable && corepack prepare yarn@4.9.1 --activate

# Копируем файлы, необходимые для установки зависимостей с помощью Yarn 4+
# Это важно, так как Yarn Berry хранит бинарники и конфигурацию в репозитории
COPY package.json yarn.lock .yarnrc.yml ./

# Устанавливаем зависимости
# Флаг --immutable гарантирует, что yarn.lock не будет изменен (аналог --frozen-lockfile)
RUN yarn install --immutable

# Копируем остальной исходный код приложения
COPY . .

# Устанавливаем переменную окружения для Next.js, чтобы отключить телеметрию
ENV NEXT_TELEMETRY_DISABLED 1

# Собираем Next.js приложение для production
RUN yarn build

#--------------------------------------------------------------------

# Этап 2: Создание легковесного образа для запуска
FROM node:22.17.0-alpine AS runner

WORKDIR /app

# Устанавливаем production-окружение
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# Создаем пользователя с ограниченными правами для безопасности
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем собранное приложение из этапа 'builder'
# Используем --chown для установки правильного владельца файлов
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

# Указываем, что приложение будет запускаться от пользователя 'nextjs'
USER nextjs

# Открываем порт, на котором будет работать приложение (стандартный для Next.js)
EXPOSE 3000

# Команда для запуска production-сервера Next.js
CMD ["node", "server.js"]