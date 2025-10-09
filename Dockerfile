# ---------- BUILD STAGE ----------
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Pakai env Docker saat build
ENV NODE_ENV=production
ENV MONGODB_URI=mongodb://mongo:27017/cv-builder

RUN npm run build

# ---------- RUNTIME STAGE ----------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV MONGODB_URI=mongodb://mongo:27017/cv-builder

COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]
