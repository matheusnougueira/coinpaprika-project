# Projeto Coinpaprika

## Sobre o projeto

- Projeto desenvolvido extraindo informações da API [Coinpaprika](https://api.coinpaprika.com/)

## Tecnologias

- [NodeJS](https://nodejs.org)
- [Typescript](https://www.typescriptlangorg/docs/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/docs/typescript.html)

## Rodando projeto

```bash
yarn
yarn run dev
```

## Features

- [x] Cadastro de usuário
- [x] Login de usuário
- [x] Listar moedas (incluir se a moeda é um favorito)
- [x] Listar favoritos (trazer informações das moedas)
- [x] Favoritar moeda
- [x] Editar favorito
- [x] Remover favorito

## Rotas do usuário

- Criação de usuário:

```json
$ POST | localhost:3000/v1/user/signup

// Exemplo de uma requisão
{
  "nickName": "matheus_dev",
  "password": "testando"
}

// Exemplo de resposta
{
  "message": "User added",
  "user": {
    "nickName": "matheus_dev",
    "password": "${hashPassword}",
    "authorization": {
      "token": "${token}"
    }
  }
}
```

- Login de usuário :

```json
$ POST | localhost:3000/v1/user/signup

// Exemplo de uma requisão
{
  "nickName": "matheus_dev",
  "password": "testando"
}

// Exemplo de uma resposta
{
  "userAuthorized": {
    "user": "matheus_dev",
    "token": {
      "value": "${token}",
      "expiresIn": "1d"
    }
  }
}
```

#### Observação

Para conseguir realizar as demais requisições, é necessário incluir o Bearer Token (retornado na requisição de criação e login) em todas as reuisições

```json
// Caso não insira o token

Status: 401 Unauthorized
{
  "error": "Unauthorized"
}
```

## Rotas das moedas

#### Observação

A API [Coinpaprika](https://api.coinpaprika.com/) possui um limite de 10 requisições mensais, então, salvei o retorno da API no MongoDB, dessa forma, podemos testar quantas vezes quisermos

- Salvar no MongoDB as moedas da API
```json
$ GET | localhost:3000/v1/coins/save
```

- Listar todas as moedas:

```json
$ GET | localhost:3000/v1/coins/list

// Exemplo de uma resposta
{
     "_id": "634757fd74b2755a3a4da9ed",
     "idCoin": "usdc-usd-coin",
     "symbol": "USDC",
     "notes": "USD Coin",
     "createdAt": "2022-10-13T00:12:54.188Z",
     "updatedAt": "2022-10-13T00:12:54.188Z",
     "__v": 0
   },
   {
     "_id": "634757fd74b2755a3a4da9f4",
     "idCoin": "doge-dogecoin",
     "symbol": "DOGE",
     "notes": "Dogecoin",
     "createdAt": "2022-10-13T00:12:54.189Z",
     "updatedAt": "2022-10-13T00:12:54.189Z",
     "__v": 0
   },
```

- Editar uma moeda
```json
$ POST | localhost:3000/v1/coins/write

// Exemplo de uma requisição
{
  "idCoin": "eth-ethereum",
  "notes": "que bonitinha essa moeda",
  "favorite": true // favorita ? true : false
}

// Exemplo de uma resposta
{
  "message": "Coin updated",
  "coin": {
    "notes": "que bonfdfdita essa moeda em moeda",
    "favorite": true,
    "favoriteCreated": "Wed Oct 12 2022 23:21:35 GMT-0300 (Brasilia Standard Time)",
    "favoriteUpdated": "Wed Oct 12 2022 23:21:35 GMT-0300 (Brasilia Standard Time)",
    "_id": "6347762faa6e1cd5bdac460b"
  }
}
```

- Listar moedas favoritas
```json
$ GET | localhost:3000/v1/coins/list/favorites

// Exemplo de uma resposta
{
  "favoriteCoins": [
    {
      "_id": "634757fd74b2755a3a4da9eb",
      "idCoin": "eth-ethereum",
      "symbol": "ETH",
      "notes": "que bonfdfdita essa moeda em moeda",
      "createdAt": "2022-10-13T00:12:54.188Z",
      "updatedAt": "2022-10-13T02:21:35.744Z",
      "__v": 0,
      "favorite": true,
      "favoriteCreated": "Wed Oct 12 2022 23:21:35 GMT-0300 (Brasilia Standard Time)",
      "favoriteUpdated": "Wed Oct 12 2022 23:21:35 GMT-0300 (Brasilia Standard Time)"
    }
  ]
}
```

- Buscando uma moeda por id
```json

$ GET | localhost:3000/v1/coin/get

// Exemplo de uma requisição
{
  "idCoin": "eth-ethereum"
}

// Exemplo de uma resposta
{
  "coin": [
    {
      "_id": "634757fd74b2755a3a4da9eb",
      "idCoin": "eth-ethereum",
      "symbol": "ETH",
      "notes": "que bonfdfdita essa moeda em moeda",
      "createdAt": "2022-10-13T00:12:54.188Z",
      "updatedAt": "2022-10-13T02:21:35.744Z",
      "__v": 0,
      "favorite": true,
      "favoriteCreated": "Wed Oct 12 2022 23:21:35 GMT-0300 (Brasilia Standard Time)",
      "favoriteUpdated": "Wed Oct 12 2022 23:21:35 GMT-0300 (Brasilia Standard Time)"
    }
  ]
}
```
