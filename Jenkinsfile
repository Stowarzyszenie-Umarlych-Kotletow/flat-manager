pipeline {
  agent any
	environment {
		DOCKER_IMAGE_NAME = "flatmanager/backend"
		DOCKER_REGISTRY = "https://ziemniak.cloud:8090"
		DOCKER_REGISTRY_CREDENTIAL = "nexus-docker"
		dockerImg = ''
		NEXUS_VERSION = "nexus3"
		NEXUS_PROTOCOL = "https"
		NEXUS_URL = "nexus.ziemniak.cloud"
		NEXUS_REPOSITORY = "maven-flatmanager"
		NEXUS_CREDENTIAL_ID = "nexus"
	}
  tools {
    maven 'maven-3.8.4'
    jdk 'jdk-11'
		nodejs "node"
  }
  options {
    gitLabConnection('gitlab.ziemniak.cloud')
	gitlabBuilds(builds: ['build', 'test', 'build-frontend', 'test-frontend', 'deploy'])
  }
  triggers {
    gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All')
  }
  stages{
		stage('build') {
			steps {
				updateGitlabCommitStatus name: 'build', state: 'pending'
				dir('flatmanager') {
					sh 'mvn compile'
				}
			}
			post {
				success {
  				updateGitlabCommitStatus name: 'build', state: 'success'
  			}
				failure {
					updateGitlabCommitStatus name: 'build', state: 'failed'
				}
			}
		}
		stage('test') {
			steps {
				updateGitlabCommitStatus name: 'test', state: 'pending'
				dir('flatmanager') {
					sh 'mvn verify'
				}   
				dir('flatmate/flatmate') {
					sh 'npm test'
				}
			}
			post {
			  success {
			    junit '**/target/*-reports/*.xml'
			    jacoco(execPattern: 'target/jacoco.exec')
			    archive "target/**/*"
					updateGitlabCommitStatus name: 'test', state: 'success'
			  }
				failure {
					updateGitlabCommitStatus name: 'test', state: 'failed'
				}
			}
		}
		stage('build-frontend') {
			steps {
				updateGitlabCommitStatus name: 'build-frontend', state: 'pending'
				dir('flatmate/flatmate') {
					sh 'npm install'
				}
			}
			post {
				success {
					updateGitlabCommitStatus name: 'build-frontend', state: 'success'
				}
				failure {
					updateGitlabCommitStatus name: 'build-frontend', state: 'failed'
				}
			}	
		}
		stage('test-frontend') {
			steps {
				updateGitlabCommitStatus name: 'test-frontend', state: 'pending'
				dir('flatmate/flatmate') {
					sh 'npm test'
				}
			}
			post {
				success {
  				updateGitlabCommitStatus name: 'test-frontend', state: 'success'
  			}
				failure {
					updateGitlabCommitStatus name: 'test-frontend', state: 'failed'
				}
			}	
		}

		stage('deploy') {
			steps {
				updateGitlabCommitStatus name: 'deploy', state: 'pending'
				dir('flatmanager') {
					sh 'mvn clean package'
					script {
						pom = readMavenPom file: "pom.xml";
						// Find built artifact under target folder
						filesByGlob = findFiles(glob: "target/*.${pom.packaging}");
						// Print some info from the artifact found
						echo "${filesByGlob[0].name} ${filesByGlob[0].path} ${filesByGlob[0].directory} ${filesByGlob[0].length} ${filesByGlob[0].lastModified}"
						// Extract the path from the File found
						artifactPath = filesByGlob[0].path;
						artifactName = "${pom.artifactId}-${pom.version}.${pom.packaging}";
						// Assign to a boolean response verifying If the artifact name exists
						artifactExists = fileExists artifactPath;
						branchName = env.GIT_BRANCH.tokenize("/")[1]; // origin/[main]
						targetBranch = branchName != null ? branchName : env.gitlabTargetBranch;
						isMerging = env.gitlabSourceBranch != null && env.gitlabSourceBranch != env.gitlabTargetBranch;
						if(artifactExists) {
							echo "*** File: ${artifactPath}, group: ${pom.groupId}, packaging: ${pom.packaging}, version ${pom.version}";
							echo "${branchName} ${env.gitlabSourceBranch} ${env.gitlabTargetBranch}";
							
							if(targetBranch == 'main' || targetBranch == 'develop') {
								echo "Saving Jenkins artifacts...";
								archiveArtifacts artifacts: "${artifactPath}", fingerprint: true;
							}
							if(targetBranch == 'main' && !isMerging) {
								echo "Deploying to nexus...";
								nexusArtifactUploader(
									nexusVersion: NEXUS_VERSION,
									protocol: NEXUS_PROTOCOL,
									nexusUrl: NEXUS_URL,
									groupId: pom.groupId,
									version: pom.version,
									repository: NEXUS_REPOSITORY,
									credentialsId: NEXUS_CREDENTIAL_ID,
									artifacts: [
										// Artifact generated such as .jar, .ear and .war files.
										[artifactId: pom.artifactId,
										classifier: '',
										file: artifactPath,
										type: pom.packaging],
										[artifactId: pom.artifactId,
										classifier: '',
										file: "pom.xml",
										type: "pom"]
									]
								);
								echo "Deploying docker image...";
								dockerImg = docker.build("${DOCKER_IMAGE_NAME}:${pom.version}", "-f Dockerfile.ci . --build-arg MAIN_JAR_FILE=${artifactName}");
								docker.withRegistry(DOCKER_REGISTRY, DOCKER_REGISTRY_CREDENTIAL) {
									dockerImg.push();
								}
								sh "docker rmi $DOCKER_IMAGE_NAME:${pom.version}";
								

							}
						} else {
							error "*** File: ${artifactPath}, could not be found";
						}
					}
				}
				
			}
			post {
				success {
					updateGitlabCommitStatus name: 'deploy', state: 'success'
				}
				failure {
					updateGitlabCommitStatus name: 'deploy', state: 'failed'
				}
			}
		}
  }
}
