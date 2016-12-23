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
//    stage('Test PHP') {
//        sh 'vendor/phpunit/phpunit/phpunit'
//    }
//    stage('Test JS') {
//        withEnv(['CI=true']) {
//            sh 'npm test'
//        }
//    }
//    stage('Deploy') {
//   	    echo 'deploying ... (not really)'     
//   }
}
