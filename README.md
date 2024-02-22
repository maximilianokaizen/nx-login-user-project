
# NG MonoRepo Login sample app.

This application has a simple example for a login app.
We have a backend API created using NestJS, using a DDD aproach.

The panel it's a very basic frontend APP with only two routes, one public and other private.

# Requirements

Docker
Docker-Compose
NVM or Node 

# Steps

#### 1. Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/maximilianokaizen/nx-login-user-project
cd mate
```

#### 2. Install dependencies
```bash
npm i 
```

#### 3. Build and Run the Services

```bash
docker-compose up --build -d
```

#### 4. Create Database and run migrations

Rename env.example to .env

```bash
npx prisma init
npx prisma generate 
npx prisma migrate dev
```

#### 5. Serve the backend and the panel

Go to the NG workspace folder

nx serve ms-users-login
nx serve panel

# CURL

#### Create a new USER

```bash
curl --location 'http://localhost:3000/api/users/'
--header 'Content-Type: application/json'
--data-raw '{ "email" : "john.wick@thecontinental.com", "password" : "password", "name" : "John", "lastName" : "Wick" }'
```
#### Auth

```bash
curl --location 'http://localhost:3000/api/users/auth'
--header 'Content-Type: application/json'
--data-raw '{ "email" : "john.wick@thecontinental.com", "password" : "password" }'
```

# NG Commands

```bash
nx serve <app-name>
```
```bash
nx generate @nrwl/react:app <app-name>
```
```bash
nx build
```
```bash
nx test
```
```bash
nx graph
```

