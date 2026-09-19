FROM node:22-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
ENV NODE_ENV=production
ENV NJ_DB_PATH=/data/game.db
CMD ["npm", "run", "railway:start"]
