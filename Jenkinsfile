pipeline {
     agent { any { image 'node:12.16.2' args '-p 3000:3000' } }
    stages {
        stage('Build') {
            steps {
                sh 'cd frontend && npm install'
            }
        }
        stage('Deliver') {
             steps {
                    sh './jenkins/scripts/deliver.sh'
                    input message: 'Finished using the web site? (Click "Proceed" to continue)'
                    sh './jenkins/scripts/kill.sh'
                }
             }
    }
}