FROM php:8.2-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Permissions
RUN chmod -R 777 storage bootstrap/cache

# Expose port (Render uses 10000)
EXPOSE 10000

# ✅ START THE APP (NO key:generate here)
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
