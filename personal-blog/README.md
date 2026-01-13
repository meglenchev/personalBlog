# React based project for Softuni exam

## 1 Implementing the design from Photoshop into HTML/CSS
- [x] Create index.html file
- [x] Create SCSS style using `EXTENSIONS: Live Sass Compiler`
- [x] Create Header ( Navigation and Logo)
- [x] Аdding resources for buttons and quick linksFooter
- [x] Create Header Image
- [x] Create Quick links
- [x] Create quick author info box
- [x] Create Latest posts
- [x] Create Upcoming practices
- [x] Create Post categories
- [x] Create Login form
- [x] Create Register page
- [x] Image optimization
- [x] Create About page
- [x] Create Edit Author Info
- [x] Create Add Blog Page
- [x] Create Add Practices Page

## 2 Create React Project
- [x] Install React `npm i vite`
- [x] Add resources and clean project
- [x] Add Header / Footer components

## 3. Аdd Reacr Router And Dynamic Navigation 
- [x] Install Reacr Router `npm i react-router`
- [x] Add And Setup React Router
- [x] Add NaviLink (Dynamic Navigation) to App

## 4. Adding login, registration and functionality
- [x] Create useForm Hook
- [x] Using useForm in login
- [x] Sending login fetch to server
- [x] Create useRequest Hook
- [x] Sending Register request to server
- [x] Using a request hook for the login form

## 5. Server change
- [x] Delete the server
- [x] Adding the SoftUni practice server
- [x] Adding Firebase to the project
- [x] Create useFetch hook form 
- [x] Creating endpoints with the links to the server
- [x] Fetching dynamic blog data on the homepage
- [x] Fetching dynamic practices data on the homepage
- [x] Adding initial values ​​to the server

## 6. Dynamic App Functionality ( Authorization, Authentication, About, Login, Register, Logout, Add, Edit, Delete )
- [x] Create blogs page
- [x] Fetching dynamic blogs data
- [x] Fetching blog details data
- [x] Creating a user context
- [x] Create a new hook to save user information
- [x] Moving user state up the tree
- [x] Modification of registration to work with UserContext
- [x] Show different navigation options depending on whether a user is logged in
- [x] Create Route Guard
- [x] Only authenticated users can edit posts
- [x] Create blog page
- [x] Create blog post edit
- [x] Add blog post edit functionality
- [x] Delete blog post functionality
- [x] Create practices page
- [x] Fetching dynamic practices data
- [x] Fetching practice details data
- [x] Add post practice details data functionality
- [x] Delete practice functionality
- [x] Back button functionality
- [x] About author get dynamic data
- [x] Edit author info functionality
- [x] Create edit practices page
- [x] Add edit practices functionality
- [x] Add Logout functionality
- [x] Show only current practices
- [x] Create a settings page
- [x] Add settings page functionality
- [x] Extending the userContext with the global settings ID `settingsId`
- [x] Retrieving dynamic information about the author of the home page and saving the `settingsId` to the localstore
- [x] Create edit settings page
- [x] Getting the right information to edit settings
- [x] Change the useForm hook to work with file type fields
- [x] Change how form data is submitted using  `onSubmit`
- [x] Create submit edit settings data functionality
- [x] Create contact blog
- [x] Changing the functionality of the blog edit form
- [x] Create `uploadImage hook`
- [x] Using the `uploadImage hook` in (UserSettings, UserSettingsEdit)
- [x] Refactoring the blog edit form. Expanding the functionality to be able to upload images
- [x] Refactoring the practice edit form. Expanding the functionality to be able to upload images
- [x] Refactoring the blog creation form to use a `useForm hook`
- [x] Refactoring the practice creation form to use a `useForm hook`
- [x] Expand settings and remove the author editing component
- [x] Install Optimizer - React Compiler
- [x] Add protection if you are logged in so you cannot access the login and registration
- [x] When changing the path, returns the scroll to the starting position
- [x] Home: Add a dynamic title and change a `link` to `a`
- [x] Add a dynamic title
- [x] Stripping spaces at the end and beginning depending on the field
- [x] Checking for missing photos in blog editing, practices, and author
- [x] When the project is initially loaded, the author page shows that there is no content
- [x] Checking during registration whether there are any settings added. If there are, it takes you to the home page
- [x] Add NotFound page
- [x] If you are not the owner of the post or practice, you cannot edit them, delete them
- [x] Home: Optimizing logic to avoid complex checks in many places in the code
- [x] Preparing to use a single component for creation and editing
- [x] Unifying blog post creation and editing components for project optimization
- [x] Unifying practice creation and editing components for project optimization
- [x] Replacing the Softuni server with an Express/MongoDB - based server
- [] Setting up the client and server to work together
    - [x] Optimizing server response during registration
    - [x] Change endpoints
    - [x] Adding categories to the controller
    - [x] Add blog edit endpoint
    - [x] Optimizing and modifying the blog detail page
    - [x] Modifying the request hook
    - [x] Modify the creation and editing component
    - [x] Add endpoints to delete
    - [x] Add practice create endpoint and rename date field to practiceDate

- [x] Adding credentials: 'include' to the request hook due to the switch to HttpOnly cookies
- [x] Changing authentication in user context due to the transition to HttpOnly cookies