# App

## init Steps

1. npm init -y
2. npm i typescript --save-dev
3. npm tsc --init
4. npm i @types/node --save-dev

5. Express & the type for the express  
`
npm i express
npm i @types/express --save-dev
`

6. npm i ts-node nodemon --save-dev
7. nodemon and set its config
`
touch nodemon.json
{
    "watch": [
        "src"
    ],
    "ext": ".js,.ts",
    "exec": "npx ts-node ./src/index.ts"
}
`
8. npm i prisma @prisma/client
9. npx prisma init
10. npx prisma migrate dev --name CreateUsersTable
