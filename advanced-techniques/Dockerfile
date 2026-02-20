FROM node:20-alpine

RUN corepack enable

WORKDIR /app

# deps (cache Docker)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# code
COPY . .

EXPOSE 5173

CMD ["pnpm", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]