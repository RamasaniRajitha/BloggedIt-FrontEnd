pipeline{
    environment{
        registry = credentials('FrontEndRegistry')
        dockerImage = ""
        PORT = 5000
        CONNECTION_URL = credentials('CONNECTION_URL')
    }
    agent any
    stages{
        stage('Stage 1: Git Clone'){
            steps{
                git branch: 'master',
                url: 'https://github.com/RamasaniRajitha/BloggedIt-FrontEnd.git'
            }
        }
        stage('Test'){
            steps {
                echo 'Building..'
                sh 'npm install --legacy-peer-deps'
                echo 'Testing..'
                sh 'npm test'
            }
        }
        stage('Building image') {
            steps{
                script {
                dockerImage = docker.build registry + ":latest"
                }
            }
        }
        stage('Deploy Image') {
            steps{
                script {
                    docker.withRegistry( '', 'DockerHubCred' ) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Ansible Deploying the Docker Image'){
            steps{
                echo 'Deploying the Docker Image'
                ansiblePlaybook becomeUser:null,
                colorized: true,
                credentialsId: 'localhost',
                disableHostKeyChecking: true,
                installation: 'Ansible',
                inventory: 'Deployment/inventory',
                playbook: 'Deployment/playbook.yml',
                sudoUser: null,
                extraVars: [
                    CONNECTION_URL: CONNECTION_URL,
                    PORT: PORT,
                    registry: registry
                ]
            }
        }
    }
}