#!groovy

node('tst.wimf.space') { 
    stage('Checkout') {
        checkout scm
   }
    stage('Build') { 
        parallel php: {
            sh 'cp /var/www/laravel/.env .'
            sh 'composer update'
        },
        js: {
            checkout scm
            sh 'npm install'
        }
    }
    stage('Test') {
        parallel php: {
            sh 'vendor/phpunit/phpunit/phpunit'
        },
        js: {
            withEnv(['CI=true']) {
                sh 'npm test'
            }            
        }
    }
    stage('Deploy') {
   	    echo 'deploying ... (not really)'
        echo env.BRANCH_NAME     
   }
}
