# TaskLab
## To-Do Web Application 

This repository houses the source code for a feature-rich web-based to-do application built with:

**Backend:** Node.js, Express  
**Frontend:** React, Material UI, Redux Toolkit  
**Database:** MongoDB
**Authentication:** JWT (JSON Web Token)

## Features

- **Secure User Authentication:** Create and manage user accounts using JWT for secure login and signup.
- **Task Management:** Seamlessly organize your tasks:
  - Create new tasks directly on the main board (/board).
  - Attach images to your tasks for visually appealing task boards.
  - View existing tasks and delete them as needed.
- **Advanced Filtering:** Filter tasks based on specific tags for enhanced organization.
- **Powerful Search:** Effortlessly find tasks using a comprehensive text search feature.

## Project Structure

The project follows a well-organized structure:
```
.
├── client/   # frontend code for the application
│   ├── src/  # Controllers for handling API requests
|   |   ├── api/ # api info for backend communication
|   |   ├── app/ 
|   |   ├── components/ #react components for UI 
|   |   ├── features/ #redux toolkit slicers
|   |   ├── App.js  
|   |   ├── Index.js # Entry point for the backend server
|   |   └── styles.css # styles for react components
│   └── public/
|
├── server/   # Backend code for the application
│   ├── controllers/  # Controllers for handling API requests
│   ├── middleware/       # authentication middleware
│   ├── models/       # Mongoose database schemas 
│   ├── routes/    # routing logic for API
|   ├── util/    # util function for creating secret token
|   ├── .env    # database credentials and token key for jwt
│   └── index.js       # Entry point for the backend server
├── package.json  # Project dependencies
└── README.md     # This file

```


## Installation

### Clone the Repository

Use Git to clone this repository to your local machine.

### Running the Application

#### Run the Backend

```
cd server
npm install  # or yarn install
npm start
```
#### Run the Frontend

```
cd client
npm install  # or yarn install
npm start
```
 The application will be accessible at http://localhost:3000/ (which will redirect to http://localhost:3000/signin automatically) 
 (Mongodb database credentials are supplied in .env file and is accessible from every IP address, thus no need for creating a local database).


 ## Test Users
 There are two users registered to database with following credentials:
|   username      | password |
| -------------   | -------- |
| sudeonder       | sude     |
| playableFactory | olimp    |

Please check them for better demonstration of features and feel free to create users from http://localhost:3000/signup page.

 

 ## Screenshots

 <div style="display: flex; flex-wrap: wrap; margin:20px; padding: 20px;">
  <div style="width: 50%; padding: 10;">
        <img src="/client/src/images/screenshots/Screenshot%202024-06-10%20at%2001.22.55.png" style="width: 80%; height: auto;">
  </div>
  
  <div style="width: 50%; padding: 10px; margin:20px;">
        <img src="/client/src/images/screenshots/Screenshot%202024-06-10%20at%2002.22.34.png" style="width: 80%; height: auto;">
    
  </div>

  <div style="width: 50%; padding: 10px; margin:20px;">
        <img src="/client/src/images/screenshots/Screenshot%202024-06-10%20at%2001.23.36.png" style="width: 80%; height: auto;">
  </div>

  <div style="width: 50%; padding: 10px; margin:20px;">
        <img src="/client/src/images/screenshots/Screenshot%202024-06-10%20at%2001.24.43.png" style="width: 80%; height: auto;">
  </div>
      <img src="/client/src/images/screenshots/Screenshot%202024-06-10%20at%2002.05.51.png" style="width: 80%; height: auto;">
  </div>
  </div>
      <img src="/client/src/images/screenshots/Screenshot%202024-06-10%20at%2001.49.01.png" style="width: 80%; height: auto;">
  </div>

</div>


