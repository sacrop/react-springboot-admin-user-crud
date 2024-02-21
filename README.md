# React-SpringBoot-Admin-User-CRUD

This repository contains a CRUD (Create, Read, Update, Delete) application built using React for the front end, Spring Boot for the back end, Redux for state management, JWT for authentication with Spring Security, Axios for handling HTTP requests, and Bootstrap for styling.

## Features

- User authentication using JWT (JSON Web Tokens) with Spring Security.
- CRUD operations for managing user data.
- Redux for state management in the front end.
- Axios for sending and receiving responses from the back end.
- Bootstrap for designing the user interface.

## Technologies Used

- React
- Redux
- Spring Boot
- JWT (JSON Web Tokens)
- Spring Security
- Axios
- Bootstrap

## Installation

To run this application locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/your-username/react-springboot-admin-user-crud.git
```

2. Navigate to the project directory:

```
cd react-springboot-admin-user-crud
```

3. Install dependencies:

```
npm install
```

4. Start the React front end:

```
npm start
```

5. Navigate to the `backend` directory:

```
cd backend
```

6. Run the Spring Boot back end:

```
./mvnw spring-boot:run
```

## Usage

1. After starting both the front end and back end, you can access the application in your web browser at `http://localhost:3000`.

2. Use the provided features to manage user data, including creating, reading, updating, and deleting users.

## API Endpoints

The following endpoints are available for interacting with the back end:

- `POST /api/authenticate`: Authenticates a user and returns a JWT token.
- `GET /api/users`: Retrieves a list of all users.
- `GET /api/users/{id}`: Retrieves details of a specific user.
- `POST /api/users`: Creates a new user.
- `PUT /api/users/{id}`: Updates an existing user.
- `DELETE /api/users/{id}`: Deletes a user.

## Postman Collection

For testing the API endpoints, you can import the provided Postman collection located at `postman/React-SpringBoot-Admin-User-CRUD.postman_collection.json`.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for any improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to update this README with additional information as needed. Happy coding! 🚀
