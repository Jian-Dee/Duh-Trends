# Duh-Trends
Duh Trends Web-Based Business Operations Management System

Prerequisites
Before you start, ensure you have the following installed:

Node.js and npm
Download and install Node.js from [here](https://nodejs.org/). npm (Node Package Manager) is bundled with Node.js.

MySQL
Make sure MySQL is installed and running on your local machine. You can download it from [here](https://dev.mysql.com/downloads/installer/).

Visual Studio Code (VS Code) or any other IDE
VS Code is a code editor that you can use to edit and manage your project files. Download and install VS Code from [here](https://dev.mysql.com/downloads/installer/).

Installation Guide
1. Clone the repository
Start by cloning the repository to your local machine using Git:

git clone <repository_url>


Navigate to the project directory:

cd <project_folder>


2. Install the required dependencies
Ensure that you have Node.js and npm installed by running:

node -v
npm -v

Once confirmed, install the necessary dependencies:

npm install express mysql2 cors


3. Set up the MySQL Database
Ensure that your MySQL server is running. You will need to create a database named db_duh_trends_test or modify the database configuration in the code to match your database name.

You can do this via the MySQL command line:

CREATE DATABASE db_duh_trends_test;

Then import the local database:

mysql -u root -p db_duh_trends_test < db_duh_trends_test.sql

4. Running the Project
Start the server by running:

node server.js

The server should now be running on http://localhost:3001. You should see a message saying:

Server running on port 3001

