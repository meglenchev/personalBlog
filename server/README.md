# Server For The React Exam Project At SoftUni

## 1. Initialize Project 
 - [x] Initialize npm project `npm init -y`
 - [x] Change module system
 - [x] Add start file `/src/index.js`
 - [x] Add dev script
 - [x] Add start script
 - [x] Config debugger

 ## 2. Expres 
 - [x] Install Expres `npm i express`
 - [x] Init express server
 - [x] Add body parser
 - [x] Add JSON parser
 - [x] Add home controller
 - [x] Add route file

 ## 3. Database
 - [x] Install mongoose `npm i mongoose`
 - [x] Connect to db
 - [x] Add error handling on connect
 - [x] Add user model

 ## 4. Register / Login / Logout
 - [x] Create user controller
 - [x] Add user controller to routes
 - [x] Create user service
 - [x] Instal bcrypt `npm i bcrypt`
 - [x] Hash passwords before safe
 - [x] Use env variables `npm i dotenv`
 - [x] Install jsonwebtoke `npm i jsonwebtoken`
 - [x] Generate token
 - [x] Return the result in Json format

 - [x] Add Cors To API `npm i cors`
 - [x] Setup Cors

 - [x] Adding email and ID to server response during login and registration

 ## 5. Blog
 - [x] Create blog models
 - [x] Create blog controller
 - [x] Add blog controller  to routes
 - [x] Create blog service

 ## 6. Changes on the server to save and return the correct data needed for the client to work
 - [x] Add the 'presentation' to the Blog model
 - [x] Add 'Auth Middleware'
 - [x] Sort blogs - show most recently added first

## 7. Creating strong user authentication - HttpOnly Cookie
  - [] Store the token in an HttpOnly Cookie (not accessible to JavaScript)
    - [x] Installing cookie-parser `npm install cookie-parser`
    - [x] Login Controller (Cookie Creation)
    - [x] LogOut Controller 
    - [x] CORS settings for use (credentials: 'include')
    - [x] Change token retrieval in Auth Middleware

## 8. Practice
  - [x] Define Practice model with validation and timestamps
  - [x] Implement CRUD services for Practice model
  - [x] Implement Practice controller with full CRUD and authorization
  - [x] Register practice routes

 ## ToDo 
 - [] Аutomatic generation of "slugs" (friendly URLs) for Blogs and Practices `npm install speakingurl`