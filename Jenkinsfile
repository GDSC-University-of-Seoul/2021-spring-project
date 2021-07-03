pipeline {
     agent any
     stages {
         stage('Build') {
             steps {
                 echo 'Building...'
             }
             post {
                 always {
                     jiraSendBuildInfo site: '2021-spring-dsc-project-team.atlassian.net'
                 }
             }
         }
         stage('Deploy - Staging') {
             when {
                 branch 'master'
             }
             steps {
                 echo 'Deploying to Staging from master...'
             }
             post {
                 always {
                     jiraSendDeploymentInfo site: '2021-spring-dsc-project-team.atlassian.net', environmentId: 'us-stg-1', environmentName: 'us-stg-1', environmentType: 'staging'
                 }
             }
         }
         stage('Deploy - Production') {
            when {
                branch 'master'
            }
            steps {
                echo 'Deploying to Production from master...'
            }
            post {
                always {
                    jiraSendDeploymentInfo site: '2021-spring-dsc-project-team.atlassian.net', environmentId: 'us-prod-1', environmentName: 'us-prod-1', environmentType: 'production'
                }
            }
         }
     }
 }