#!groovy

node('tst.wimf.space') { 
    stage('Deploy') {
        echo 'deploying ... (not really)'
        parallel php: {
            echo 'deploying php'
        },
        js: {
            echo 'deploying js'
        }
   }
//    stage('Build') { 
//        parallel php: {
//            checkout scm
//            sh 'cp /var/www/laravel/.env .'
//            sh 'composer update'
//        },
//        js: {
//            checkout scm
//            sh 'npm install'
//        }
//    }
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
