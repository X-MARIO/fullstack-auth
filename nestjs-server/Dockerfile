# --- Этап 1: Сборка приложения ---
FROM node:22.17.0-alpine AS build

# Устанавливаем системные зависимости
RUN apk add --no-cache libc6-compat

# Устанавливаем Yarn
WORKDIR /app
RUN corepack enable && corepack prepare yarn@4.9.1 --activate

# Копируем package.json, устанавливаем ВСЕ зависимости (включая dev-зависимости, как prisma)
COPY package.json yarn.lock* .yarnrc.yml* ./
RUN yarn install --immutable

# Копируем остальной код
COPY . .

# Генерируем клиент Prisma
RUN yarn prisma generate

# Собираем проект
RUN yarn build

# ---
# Этап 2: Финальный образ для production ---
FROM node:22.17.0-alpine AS production

ENV NODE_ENV=production
WORKDIR /app

# Устанавливаем системные зависимости
RUN apk add --no-cache libc6-compat

# ❗ ВОТ ИСПРАВЛЕНИЕ: Активируем нужную версию Yarn
RUN corepack enable && corepack prepare yarn@4.9.1 --activate

# Копируем только необходимые для production-установки файлы из этапа сборки
COPY --from=build /app/package.json /app/yarn.lock* /app/.yarnrc.yml* ./
COPY --from=build /app/.yarn ./.yarn

# Устанавливаем ТОЛЬКО production-зависимости
RUN yarn workspaces focus --all --production

# Копируем собранный код и сгенерированный клиент Prisma
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma/client ./node_modules/.prisma/client
COPY --from=build /app/prisma/schema.prisma ./prisma/schema.prisma

# Запускаем приложение
CMD ["node", "dist/main.js"]