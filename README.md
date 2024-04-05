# Project Management react application

## Description
This is a React application for managing projects and tasks.

## How to Run Locally
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using npm: npm install
4. Start the development server: npm start
5. Open your web browser and go to http://localhost:3000 to view the application.

## Building Docker Image and Running Container
1. Make sure Docker is installed on your machine.
2. Navigate to the project directory.
3. Pull the Docker image: docker pull archmike/react-todo-app
4. Run a container using the image: docker run -p 8080:8080 archmike/react-todo-app
5. Open your web browser and go to http://localhost:8080 to view the application running inside the Docker container.

## Usage
- To add a project, type the project name in the input field and press Enter or click the "+" button.
- To add a task to a project, select the project from the project list and fill in the task details (name, start date, end date, status), then click the "Add Task" button.
- To edit a project name, click the edit icon next to the project name, update the name, and press Enter.
- To delete a project, click the delete icon next to the project name.
- To edit a task, click on the field you want to edit, update the details, and press Enter.
- To delete a task, click the X next to the task.

## Assumptions or Decisions
1. The application uses localStorage for storing project and task data.
2. The application uses Material-UI components for the user interface.
3. Date input fields accept MM-DD-YYYY format.
4. Completed tasks are marked with a specific status ('Completed').
5. The application assumes a single user environment (no authentication or user management).
6. The Dockerfile uses Node.js 18-alpine as the base image for smaller image size.
7. The Dockerfile copies package.json separately to leverage Docker layer caching for faster builds.
