####
# basic laravel container
###

## composer
FROM php:7.2.5-cli-alpine
RUN apk add --update openssl zip unzip git curl && \
	curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
	docker-php-ext-install pdo mbstring

RUN groupadd www-data && \
    useradd -g www-data deploy && \
    mkdir -p /var/www && \
    chown deploy:deploy /var/www
USER deploy
WORKDIR /var/www
COPY . /var/www
RUN composer install

## nodejs
FROM node:8.11.2-stretch
RUN apt upgrade -y && apt install -y pnglib-dev && \
	mkdir -p /var/www && \
	groupadd deploy && \
    useradd -g www-data deploy
USER deploy
WORKDIR /var/www
COPY --from=0 /var/www .
RUN npm i && npm run development

# nginx
FROM nginx
RUN apk add --update php7-fpm
COPY --from=1 /var/www .
COPY nginx.conf /etc/nginx/sites-available/default

# CMD php artisan serve --host=0.0.0.0 --port=8181
EXPOSE 8181

