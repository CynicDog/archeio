# Continuous Deployment on Quarkus Application using Github Actions

In this post, we will explore how to set up a GitHub Actions workflow for continuously deploying a Quarkus application to Google Kubernetes Engine (GKE). This guide will walk you through each step of the GitHub Actions configuration, ensuring your Quarkus application is seamlessly deployed to GKE.

## Workflow Configuration Overview

The GitHub Actions workflow is defined in a YAML file. Here’s a breakdown of the key components and steps involved in the workflow:

### 1. Triggering the Workflow

The workflow is triggered manually using the `workflow_dispatch` event. This allows you to start the deployment process on demand.

```yaml
on:
  workflow_dispatch: 
```

### 2. Setting Environment Variables

Environment variables are set to store project-specific information such as the GCP project ID, GKE cluster name, zone, and the deployment name.

```yaml
env: 
  PROJECT_ID: 'encoded-etching-425009-t7'
  GKE_CLUSTER: 'autopilot-cluster-1'
  GKE_ZONE: 'us-central1'
  DEPLOYMENT_NAME: 'quarkus-gke-deploy'
```

### 3. Job Definition

A job named `setup-build-publish-deploy` is defined to run on the latest Ubuntu runner. This job includes various steps to set up the environment, build the application, and deploy it to GKE.

```yaml
jobs:
  setup-build-publish-deploy:
    name: Setup, Build, Publish, and Deploy
    runs-on: ubuntu-latest
    environment: production
    
    permissions:
      contents: 'read'
      id-token: 'write'
```

### 4. Steps Breakdown

Let's go through each step in detail:

- **Checkout the Code**

  The first step checks out the code from the repository.

  ```yaml
  steps:
  - name: Checkout
    uses: actions/checkout@v4
  ```

- **Setup Java Environment**

  The Java environment is set up using the `actions/setup-java` action.

  ```yaml
  - uses: actions/setup-java@v4.2.1
    with:
      distribution: 'temurin'
      java-version: '17'
  ```

- **Authenticate with Google Cloud**

  This step uses the `google-github-actions/auth` action to authenticate with Google Cloud using a service account key stored in GitHub secrets.

  ```yaml
  - id: 'auth'
    uses: 'google-github-actions/auth@v2'
    with:
      credentials_json: '${{ secrets.GOOGLE_CREDENTIALS }}'
  ```

  In order to get the credential json, you need to run following commands in terminal:

  ```
  gcloud init 
  
  gcloud iam service-accounts create {A_SERVICE_ACCOUNT_NAME}
  ```

  Then see the generated service account email address by running:

  ```
  gcloud iam service-accounts list
  ```

  This will return an address in the format of `{A_SERVICE_ACCOUNT_NAME}@{YOUR_PROJECT_ID}.iam.gserviceaccount.com`

  Next, grant permissions to write and register an image of the application:

  ```
  gcloud projects add-iam-policy-binding {YOUR_PROJECT_ID}  --member=serviceAccount:{SERVICE_ACCOUNT_ADDRESS} --role=roles/container.admin
  
  gcloud projects add-iam-policy-binding {YOUR_PROJECT_ID}  --member=serviceAccount:{SERVICE_ACCOUNT_ADDRESS} --role=roles/storage.admin
  
  gcloud projects add-iam-policy-binding {YOUR_PROJECT_ID}  --member=serviceAccount:{SERVICE_ACCOUNT_ADDRESS} --role=roles/container.clusterViewer
  
  gcloud projects add-iam-policy-binding {YOUR_PROJECT_ID}  --member=serviceAccount:{SERVICE_ACCOUNT_ADDRESS} --role=roles/artifactregistry.writer
  ```

  Then fetch the credentials secret by running:

  ```
  gcloud iam service-accounts keys create "key.json"  --iam-account "{SERVICE_ACCOUNT_ADDRESS}"
  ```

  Next step is convert the json file into `base64` string and register the converted string on GitHub repository action secret.

  ```
  $GKE_SA_KEY = [Convert]::ToBase64String([IO.File]::ReadAllBytes("key.json"))    
  ```

- **Get GKE Cluster Credentials**

  Fetch the GKE cluster credentials to interact with the cluster.

  ```yaml
  - id: 'get-credentials'
    uses: 'google-github-actions/get-gke-credentials@v2'
    with:
      cluster_name: ${{ env.GKE_CLUSTER }}
      location: ${{ env.GKE_ZONE }}
      project_id: ${{ env.PROJECT_ID }}
  ```

- **Setup gcloud CLI**

  Install the `kubectl` component using the `google-github-actions/setup-gcloud` action. `kubectl` is needed to create a ConfigMap.

  ```yaml
  - uses: google-github-actions/setup-gcloud@v2.1.0
    with:
      project_id: ${{ env.PROJECT_ID }}
      install_components: 
        kubectl
  ```

- **Configure Docker Authentication**

  Configure Docker to use the gcloud command-line tool for authentication.

  ```yaml
  - name: Configure Docker authentication
    run: |
      gcloud auth configure-docker
  ```

- **Create Kubernetes ConfigMap**

  Create a Kubernetes ConfigMap for storing sensitive information, such as GitHub app credentials. The workaround of injecting credentials via Kubernetes ConfigMap addresses the Quarkus static initialization issue, where certain services, such as custom `ConfigSource` requiring dependencies like database access, cannot be initialized early on. By using a ConfigMap, credentials are dynamically injected at runtime, ensuring the necessary services are available without encountering the chicken-egg problem during static initialization.

  ```yaml
  - name: Create Kubernetes ConfigMap
    run: |
      if ! kubectl get configmap {A_CONFIG_MAP_NAME}; then
        kubectl create configmap {A_CONFIG_MAP_NAME} \
          --from-literal={A_CONFIG_PROPERTY_1}=${{ secrets.SOME_CONFIG_VALUE_YOU_WANT_TO_INJECT }} \
          --from-literal={A_CONFIG_PROPERTY_2}=${{ secrets.ANOTHER_CONFIG_VALUE_YOU_WANT_TO_INJECT }};
      else
        echo "ConfigMap {A_CONFIG_MAP_NAME} already exists. Skipping creation.";
      fi
  ```

  In order for the quarkus app to recognize the Kubernetes ConfigMap, make sure the following options is configured in `application.properties` :

  ```
  %prod.quarkus.kubernetes-config.enabled=true
  %prod.quarkus.kubernetes-config.config-maps={A_CONFIG_NAME}
  A_CONFIG_PROPERTY_1=
  A_CONFIG_PROPERTY_2=
  ```

- **Build and Push Quarkus App Image**

  Build the Quarkus application and push the Docker image to the image registry.

  ```yaml
  - name: Build Quarkus App and Push to Image Registry 
    run: |
      mvn clean package -Dquarkus.container-image.build=true \
      -Dquarkus.container-image.push=true \
      -Dquarkus.jib.platforms=linux/arm64/v8 \
      --file pom.xml
  ```

- **Deploy Quarkus App to GKE**

  Deploy the built Quarkus application to GKE.

  ```yaml
  - name: Deploy Quarkus App to GKE
    run: | 
      mvn clean package -Dquarkus.kubernetes.deploy=true \
      --file pom.xml
  ```

### Conclusion

By following this GitHub Actions workflow, you can achieve continuous deployment of your Quarkus application to GKE. This setup ensures that every time you manually trigger the workflow, your application is built, containerized, and deployed to your Kubernetes cluster seamlessly. This approach automates the deployment process, reducing the potential for human error and speeding up the deployment cycle.

#quarkus #gke #kubernetes #configuration
