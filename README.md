## AWS Amplify React+Vite Starter Template with ConfigBee's Feature Flags

This repository provides a starter template for creating applications using React+Vite and AWS Amplify, emphasizing easy setup for authentication, API, and database capabilities.  
We started with the [AWS Amplify Vite-React template](https://github.com/aws-samples/amplify-vite-react-template), improved a few elements, and added **Feature Flags** using [ConfigBee](https://configbee.com/).

## Overview

This template equips you with a foundational React application integrated with AWS Amplify, optimized for scalability and performance.  
It works **without ConfigBee’s feature flags**, but by setting up a **ConfigBee account**, you can unlock hidden features and dynamically control configurations.

## Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by Amazon DynamoDB.
- **Feature Flags (Optional)**: Manage dynamic configurations and toggle features with [ConfigBee](https://configbee.com/).

## Deploying to AWS

Fork this repository or use the "Use this template" option to create a new copy of this repository in your GitHub account, then deploy it with AWS Amplify.  
For detailed deployment instructions, refer to the [AWS Amplify documentation](https://docs.amplify.aws/react/start/quickstart/#deploy-a-fullstack-app-to-aws).

## Unlocking Hidden Functionalities with ConfigBee Feature Flags

1. **Create a ConfigBee Account**  
   Sign up at [ConfigBee](https://configbee.com/) (a free plan is available and more than sufficient).
   
2. **Set Up a Project & Environments**  
   During signup, you'll create your first project and environment. Additional projects can be added as needed.
   
3. **Configure Environment Variables in AWS Amplify**  
   In the AWS Amplify Console, go to **Hosting → Environment Variables**, and add the following variables.
   
   | Variable | Description |
   | ---- | ---- |
   | VITE_CB_ACCOUNT_ID | Your ConfigBee account ID |
   | VITE_CB_PROJECT_ID | Your ConfigBee project ID |
   | VITE_CB_ENV_ID | Your ConfigBee environment ID |

   To find these values in **ConfigBee** Navigate to **Project → Environment → SDK Integrations**.
   For example, your Project could be **My ToDo App**, and your Environment could be **Staging** or **Live**, depending on your setup.\
   \
   **Note**: After adding/updating environment variables, redeploy the app in Amplify using **Branch → Deployments → Redeploy this version**.

5. **Add Feature Flags & Options in ConfigBee**  
   Navigate to **Flags & Options** in your ConfigBee project and add the following:

   | Type | Key | Name |
   | ---- | ---- | ---- |
   | Flag | upload.enabled | Upload Enabled |
   | Text | success.message | Success Message |
   | Flag | storage.manager.enabled | Storage Manager Enabled |
   | Flag | delete.todo.enabled | Delete Todo Enabled |
   | Flag | download.file.enabled | Download File Enabled |
   | Flag | functions.enabled | Functions Enabled |
   | Flag | fetch.data.enabled | Fetch Data Enabled |

6. **Update Feature Flags in Real Time**  
   You can switch flags on/off or modify option values per environment and publish changes instantly with ConfigBee’s real-time updates.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.
