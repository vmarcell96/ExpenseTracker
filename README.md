# ExpenseTracker

# Description

This is a React Typescript application where you can manage your expenses. At the moment data is only saved in local storage.

## Stack
- TypeScript
- React

## Features
- Budget creation
- Expense creation
- Automatic Total budget
- Automatic uncategorized budget

## Production build

[Deployed to Azure.](https://gray-sea-0cd7d4503.2.azurestaticapps.net/)(Login takes some time because of Azure's server speed)

## Run Locally
##### Prerequisites

- Microsoft Visual Studio to run ASP .NET backend
- Node.js to run React frontend

Clone the project and navigate to the project folder

```bash
  git clone https://github.com/vmarcell96/ExpenseTracker
  cd .\ExpenseTracker
```

Starting frontend:
Go back to the root directory of the repository and navigate to:

```bash
  cd .\ExpenseTracker\ClientApp\expense-tracker
```

Install packages

```bash
  npm i
```

Start the application 

```bash
  npm start
```
Client should be available at `localhost:3000`



## Roadmap

- Deploy to Azure
- Database
- Rest API
- Login/Logout

