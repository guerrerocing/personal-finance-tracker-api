# Financial Tracker API

## Table of Contents

- [About](#about)
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Configuration](#database-configuration)
- [Usage](#usage)

## About

This API is a financial tracker that allows users to manage their income and expenses. It provides the following functionalities:

- User registration and authentication.
- Recording income and expenses with descriptions and amounts.
- Listing, editing, and deleting financial transactions.
- Calculating and displaying financial summaries, including total income, total expenses, and balance.

The API is built using Node.js and Express.js for the backend, TypeScript for type checking, and PostgreSQL for data storage. It uses TypeORM for database operations and JWT for secure user authentication.

## Requirements

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/): Make sure Node.js is installed on your system.
- [PostgreSQL](https://www.postgresql.org/): Install and set up a PostgreSQL database for your API.
- [Git](https://git-scm.com/): (Optional) You can use Git for version control.

## Installation

Follow these steps to install and set up your API:

1. Clone the repository:

   ```bash
   git clone https://github.com/guerrerocing/personal-finance-tracker-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd personal-finance-tracker-api
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory of your project to set up environment variables. Add the following variables and replace the placeholders with your database configuration:

```dotenv
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

Make sure to keep your `.env` file private and do not commit it to version control.

## Database Configuration

Ensure your PostgreSQL database is properly set up and configured. You can use tools like [pgAdmin](https://www.pgadmin.org/) to manage your database.

1. Run Migration:
   ```bash
   npm run typeorm  migration:run
   ```

## Usage

1. Start the API:

   ```bash
   npm run dev
   ```

2. Access your API at `http://localhost:3000`
