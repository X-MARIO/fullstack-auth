FROM node:22.17.0-alpine as base

RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.9.1 --activate

RUN yarn --version

COPY package.json yarn.lock ./

RUN yarn install --immutable

FROM base as build

COPY . .

RUN yarn run prisma generate

RUN yarn build

FROM base as production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock

RUN yarn install --production --immutable

COPY --from=build /app/dist ./dist

COPY --from=build /app/prisma/__generated__ ./prisma/__generated__

CMD ["node", "dist/main"]