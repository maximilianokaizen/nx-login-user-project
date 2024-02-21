# nx-login-user-project
A simple login example using NX, NestJS, React, Golang.

docker-compose up --build -d

DB

Prisma & Migrations 

npx prisma init
npx prisma generate 
npx prisma migrate dev

--------------------------------
--------------------------------

nx serve ms-user-login
nx test ms-user-login
nx reset
nx format:write --all

--------------------------------
--------------------------------

CURL

Auth

curl --location 'http://localhost:3000/api/users/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email" : "john.wick@thecontinental.com",
    "password" : "password"
}'

Create User

curl --location 'http://localhost:3000/api/users/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email" : "john.wick@thecontinental.com",
    "password" : "password",
    "name" : "John",
    "lastName" : "Wick"
}'