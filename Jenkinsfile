node { 
    stage('Build') { 
        checkout scm
        composer update
		cp /var/www/laravel/.env .
    }
    stage('Test') {
        vendor/phpunit/phpunit/phpunit
    }
    stage('Deploy') {
        /* .. snip .. */
    }
}