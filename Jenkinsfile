#!groovy

node('tst.wimf.space') { 
    stage('Build') { 
        checkout scm
        sh 'composer update'
	    sh 'cp /var/www/laravel/.env .'
        sh 'npm install'
    }
    stage('Test PHP') {
        sh 'vendor/phpunit/phpunit/phpunit'
    }
    stage('Test JS') {
        withEnv(['NODE_ENV=CI']) {
            sh 'npm test'
        }
    }
    stage('Deploy') {
   	    echo 'deploying ... (not really)'     
   }
}
