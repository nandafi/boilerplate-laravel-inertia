# Stage 1: PHP Dependencies (Composer)
FROM composer:2.6 as vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install \
    --ignore-platform-reqs \
    --no-interaction \
    --no-plugins \
    --no-scripts \
    --prefer-dist

# Stage 2: Frontend Assets (Node)
FROM node:20-alpine as frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Copy vendor dari stage 1 karena Ziggy (JS) dibutuhkan saat build (SSR)
COPY --from=vendor /app/vendor /app/vendor
RUN npm run build


# Stage 3: Runtime Environment
FROM php:8.2-fpm-alpine

# Argument untuk UID dan GID (Default 1000 agar match dengan user Linux pada umumnya)
ARG USER_ID=1000
ARG GROUP_ID=1000

# Set working directory
WORKDIR /var/www/html

# Install system dependencies & PHP extensions
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions pdo_mysql mbstring exif pcntl bcmath gd zip opcache

# --- SECURITY: Create custom non-root user ---
# Menghapus group/user jika ID sudah ada, lalu membuat user_docker
RUN addgroup -g ${GROUP_ID} user_docker && \
    adduser -u ${USER_ID} -G user_docker -D user_docker

# Copy application code
COPY . /var/www/html

# Copy built vendor and assets from previous stages
COPY --from=vendor /app/vendor /var/www/html/vendor
COPY --from=frontend /app/public/build /var/www/html/public/build

# Optimasi Permission untuk keamanan
# Pastikan folder milik user_docker
RUN chown -R user_docker:user_docker /var/www/html/storage /var/www/html/bootstrap/cache

# Switch to non-root user
USER user_docker

EXPOSE 9000

CMD ["php-fpm"]


