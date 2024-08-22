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
