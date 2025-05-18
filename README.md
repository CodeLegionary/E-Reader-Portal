# E-Reader-Portal
## INTRO
A web-based platform for reading eBooks with authentication, reading progress tracking, and review features. Includes database-backed data persistence.

## Structure
The full-stack application is divided into two clearly distinct parts: 'demo,' which encapsulates the backend and authentication management, is written in Java (Maven + Spring-Boot), while 'Vite-Jsx' handles the dynamic part, developed with React.

## How to Start (Setting the Database)
### Install PostgreSQL
If PostgreSQL is not installed on your machine, you should download it from the [Official Site](https://www.postgresql.org/download/).

Follow the installation steps to set up PostgreSQL, which will create a default user (postgres). Depending on your OS, a password may require manual configuration; I have set my own to 'password' as you can notice from my application.yml datasource. Additionally, ensure that the psql component is selected during installation, or opt for a graphical DB administrator like pgAdmin for easier management.

### Create the Database
Unlike other DB languages, PostgreSQL follows a more formal and secure DB model, and requires the user to create manually the DB.

Therefore once PostgreSQL is running, users should open PostgreSQL administrator (e.g. pgAdmin) and execute:

```sh
CREATE DATABASE registration;
```

Alternatively, this line can be also run from the terminal if psql commands are enabled.
The relevant terminal command line would be:

```sh
psql -U postgres -c "CREATE DATABASE registration;"
```

## Backend Set-Up and Connection
### Java Spring-Boot Intro
The backend is designed to handle automatic table creation and updates once the main database has been manually set up, as previously explained.

The suggested editor for the Back-End, being a Java project, is Intelli JIDEA. This could make the experience much smoother, and let the user have a dedicated area for the backend.

### Backend Set-Up
This is a Maven-based project. Before proceeding, ensure that: Maven is installed on your system and Java 17 or later is installed, as required for Spring Boot.

To install all dependencies, run:

```sh
mvn clean install
```

### Backend Connection
As anticipated, this project uses a Spring-Boot framework, that is a standard de facto in Java for the web, and provides with many security features. The Tomcat Server is already included for running locally on your machine, and it takes only one command to make the backend run:

```sh
mvn spring-boot:run
```

## Frontend Ignition
### Vite React Framework Intro
A dedicated framework is optimal for dynamic operations, while the registration and login forms are served as templates directly in the backend. This approach was chosen in order to prioritize security, by reducing the risks of cyberattacks (e.g. Man-in-The-Middle), and improve efficiency, by reducing the JSX bundle size and minimizing unnecessary database queries from React to the backend. Beyond performance improvements, reducing latency also enhances security by limiting exposure to brute-force attack threats. This approach seamlessly integrates efficiency and cybersecurity, ensuring both reinforce each other.

### Web Application Launch
Make sure Node.js is installed on your machine. Then, in order to launch the application on a local browser, you can proceed with the following commands:

```sh
npm install
```

```sh
npm run dev
```

The first command installs all required dependencies, ensuring the project is set up correctly.
The second command starts the development server, making the application accessible in your browser.