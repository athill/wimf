node('tst.wimf.space') { 
    stage('Build') { 
        sh checkout scm
        sh composer update
		sh cp /var/www/laravel/.env .
    }
    stage('Test') {
        sh vendor/phpunit/phpunit/phpunit
    }
    stage('Deploy') {
        /* .. snip .. */
    }
}