/*
###############################################################################
Jenkinsfile Name: Jenkinsfile
Project         : WTW ee-point app
Description     : This Jenkinsfile is used for implementing CI/CD of this project.
Jenkins URL     : https://jenkins.csi-infra.com
Maintainers     : Ganesh Kumar(Celestial DevOps Team)
Email           : ganesh.k@celestialsys.com
Disclaimer      : Any modification in this file should be done after consultation
                  with the DevOps Team.
##################################################################################
*/

def sendTeamsNotification(String message, String color) {
    sh """
    curl -H 'Content-Type: application/json' -d '{
        "title": "Jenkins Build Notification",
        "text": "${message}",
        "themeColor": "${color}"
    }' ${TEAMS_WEBHOOK_URL}
    """
}

pipeline {
    agent { label 'GENERIC_SLAVE' }

    environment {
        TEAMS_WEBHOOK_URL = 'https://celestialsystem.webhook.office.com/webhookb2/68cc5d7a-2db8-4c29-a553-39c50d235c16@c5e52224-ee99-4449-86e4-9f71d30f361b/IncomingWebhook/69d17d808151417997ce53bdd0ad18e9/f2a2b3cf-b2c5-410f-a4cf-419aa4e44623' 
        NVM_DIR = "${env.HOME}/.nvm"
        NPM_REGISTRY = 'https://npm.sencha.com/'
        NPM_SCOPE = '@sencha'
        NPM_EMAIL = 'gpandey@celestialsys.com'
    }
  
    stages {
        stage('Prepare') {
            steps {
                sh 'whoami'
                sh 'printenv'
            }
        }

        stage('Sleep') {
            steps {
                sh 'echo Pausing the build for 10 minutes'
                sh 'sleep 300'
            }
        }

        stage('Setup ExtJS and Build') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'npm-sencha-credentials', passwordVariable: 'NPM_PASSWORD', usernameVariable: 'NPM_USERNAME')]) {
                        sh '''
                            echo Setting up ExtJS and Sencha CMD
                            export NVM_DIR="$HOME/.nvm"
                            [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                            nvm use 16.20.2
                            npm install -g npm-cli-login
                            npm-cli-login -u $NPM_USERNAME -p $NPM_PASSWORD -e gpandey@celestialsys.com -r $NPM_REGISTRY -s $NPM_SCOPE

                            cd reference_app
                            cd eepoint-app-engine
                            npm install
                            chmod 777 node_modules/@sencha/cmd/dist/sencha
                            npm run build
                        '''
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'echo Running Deployment steps'
                sh '''
                    USER="www-data"
                    USER1="azureuser"
                    HOST="40.90.237.70"
                    REMOTE_DIR="/var/www/eepoint-app-engine"
                    LOCAL_DIR="$PWD/reference_app/eepoint-app-engine/build"
                    
                    # Copy build artifacts to remote machine
                    ssh -o StrictHostKeyChecking=no $USER1@$HOST sudo chown -R $USER1:$USER1 $REMOTE_DIR
                    scp -i ~/.ssh/id_rsa -r $LOCAL_DIR/* $USER1@$HOST:$REMOTE_DIR
                    ssh -o StrictHostKeyChecking=no $USER1@$HOST sudo chown -R $USER:$USER $REMOTE_DIR
                    rm -r $PWD/*
                '''
            }
        }
    }

    post {
        success {
            script {
                def message = "Build #${env.BUILD_NUMBER} for ${env.JOB_NAME} succeeded!"
                sendTeamsNotification(message, 'good')
            }
        }
        failure {
            script {
                def message = "Build #${env.BUILD_NUMBER} for ${env.JOB_NAME} failed!"
                sendTeamsNotification(message, 'danger')
            }
        }
        always {
            script {
                def message = "Build #${env.BUILD_NUMBER} for ${env.JOB_NAME} finished with status: ${currentBuild.currentResult}"
                def color = currentBuild.currentResult == 'SUCCESS' ? 'good' : 'danger'
                sendTeamsNotification(message, color)
            }
        }
    }
}
