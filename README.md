# Othello Game App with Terraform Deployment - Gain Life DevOps task

This project includes a simple Othello game built using **Next.js** and **React**, along with **Terraform scripts** to deploy the app on an **AWS EC2 instance**.

---

## Features
- Interactive Othello game built with React hooks
- Deployable to an AWS ec2 using Terraform
- Node.js server running via PM2 for persistence

---

## App Structure
- `src/app/components/Othello.tsx`: Main Othello game logic and UI

---

## How to Run Locally
1. Clone the repo:
   ```bash
   git clone https://github.com/AymanMagdy/gainlife_devops_task.git
   cd othello/othello_app
   npm install
   npm run build
   npm run start
   ```
   Access the game at ```http://localhost:3000 ```
---


## How to Run The Terraform Deployment
   ```bash
    terraform init
    terraform plan
    terraform apply
   ```

## How to clean up
   ```bash
    terraform destroy
   ```