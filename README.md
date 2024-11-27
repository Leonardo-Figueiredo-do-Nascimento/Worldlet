# O que é o Worldlet?
Worldlet é uma aplicação web que simula o funcionamento de uma carteira digital mundial, permitindo aos usuários gerenciar múltiplas moedas, realizar operações bancárias e acompanhar transações.

## Tecnologias Usadas 💻
  - Java
  - Spring
  - Javascript
  - CSS
  - React.js
  - Postgresql

## APIs Usadas
Para pegar dados de países
  - https://restcountries.com/

Para pegar as taxas de conversões  
  - https://github.com/fawazahmed0/exchange-api

## Como instalar
  git clone
### Front-end
  cd ./Wordlet/Front-end/Worldlet
  
  npm install
  
  npm run dev

### Back-end
Crie um banco de dados Currency_API no Postgresql. 

Edite application.properties spring.datasource.username=SeuNomeDeUsuario e spring.datasource.password=SuaSenha

## Visão Geral
Para começar a usar o Worldlet, você precisará criar uma conta. Após criar a conta, será necessário cadastrar um cartão de crédito para começar a investir dinheiro. Depois do cadastro, você poderá escolher a moeda que deseja adicionar à sua conta, e uma carteira será criada para você.

Com uma carteira, você pode investir ou sacar dinheiro. Também é possível converter valores de uma moeda para outra. Caso não tenha uma carteira com a moeda desejada, uma nova será criada durante a conversão. Além disso, você pode transferir dinheiro para outros usuários, mas eles precisam ter uma carteira com a moeda equivalente em suas contas.

Se não deseja mais uma carteira, você pode excluí-la, e o valor investido será devolvido ao seu cartão de crédito. Você também poderá visualizar todas as operações realizadas na página de transações, onde estarão disponíveis o tipo, valor e data de cada transação.

## --------------------------------------------------------------------------------------------------

# What is Worldlet?
Worldlet is a web application to simulate how a digital world wide wallet would work, allowing users to have multiple currencies in the application and performing bank operations.

## Technologies Used 💻
  - Java
  - Spring
  - Javascript
  - CSS
  - React.js
  - Postgresql

## API's Used
To get countries information 
  - https://restcountries.com/

To get exchange rates  
  - https://github.com/fawazahmed0/exchange-api

## How to install
  git clone
### Front-end
  cd ./Wordlet/Front-end/Worldlet
  
  npm install
  
  npm run dev

### Back-end
Create database named Currency_API in postgresql 

Edit application.properties spring.datasource.username=yourusername and spring.datasource.password=yourpassword

## Overview
To start using Worldlet, you will need to create an account. Once the account is created, you will have to register a credit card to start investing money. After registering, you can choose the currency you want to have in your account, and a wallet will be created for you.
Once you have a wallet, you can invest or withdraw money from it. You can also convert an amount from one currency to another. If you don't already have a wallet with the desired currency,
a new one will be created during the conversion. Additionally, you can transfer money to other users, but they must have a wallet with the equivalent currency in their accounts. If you no longer want a wallet,
you can delete it, and the invested amount will be returned to your credit card. You can also view all the operations you have performed on the transactions page, where the type, amount, and date will be displayed.

## Youtube Video
[Watch Worldlet in action](https://youtu.be/Tw-nwPtSzJ0)
