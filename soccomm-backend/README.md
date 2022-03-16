# soccomm-backend

# How to start backend

Dependency
    -nodejs
    -nest-cli (npm i -g @nestjs/cli)
    -postgresql

NestJS-Service
    -after pulling code do (npm install).
    -then change credentials (eg.-password) in .ENV present in root folder.
    -run the service by(npm run start).
    -cross check the service in the browser whether it is running or not by providing (http://localhost:PORT).
    -HELLO WORD has to appear
    -check the gateway service app.module.ts to know to the included services in federation
    -run the required Microservices
    -finally run the Gateway service
    -in the browser (http://localhost:5000/graphql) to get the playground
