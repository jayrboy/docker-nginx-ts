# Nodejs - TypeScript

```sh
node --version
npm install -g tsc typescript ts-node ts-node-dev
tsc --init
```

update tsconfig.json (allowjavascript, rootDir, outDir) and config to `package.json`
add ./src
add ./dist

```sh
npm init -y
npm install express
npm install --save @types/express
```

```json
{
  "scripts": {
    "start": "ts-node-dev src/index.ts"
  }
}
```

# Express Types

https://javascript.plainenglish.io/typed-express-request-and-response-with-typescript-7277aea028c

# What is tsc?

TypeScript compiler to JavaScript
tsc --init : to create `tsconfig.json`

# What is ts-node?

ts index.ts == tsc && node dist/index.js

# what is ts-node-dev?

It works like nodemon for typescript

# Morgan

npm install morgan
npm install --save @types/morgan
