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
    - [x] Add practice API endpoints to the central endpoint configuration

## 6. About Author Information ( Create, Edit )
- [] Separate the creation of author information into a separate component of the settings
    - [x] Create a component to add author information
    - [x] Modification of the component for displaying author information
    - [x] Add a route to create author information
    - [x] Adding endpoints to create/retrieve author information

- [x] Adding credentials: 'include' to the request hook due to the switch to HttpOnly cookies
- [x] Changing authentication in user context due to the transition to HttpOnly cookies

- [x] Expand user state with roles and loading status
    - [x] Added 'userRoles' state to store detailed user permissions from the server
    - [x] Introduced 'isAdmin' flag for simplified role-based access control in components
    - [x] Added 'isLoading' state to manage initial session verification and prevent UI flickering
    
- [x] Grant administrative access to edit and delete actions
- [x] Implement AboutCreate and AboutEdit functionality
    - [x] Added routes for creating and editing 'About' information in App.jsx.
    - [x] Refactored AboutCreate.jsx to support dual modes ("create" and "edit") using a 'mode' prop.
    - [x] Integrated form logic to handle both initial data submission and updates for the about section.
- [x] Upgrade RegisteredOnlyRoute with role-based validation
- [x] Remove settingsId persistence due to server migration
- [x] Refactor(navigation): use replace instead of push for redirect
- [x] Restrict settings access to admin users only
- [x] Overhaul user settings management and clean up endpoints
    - [x] Replace UserSettingsEdit with a new, more robust UserSettings
    - [x] Update home page to integrate with the new UserSettings component
    - [x] Remove obsolete endpoints and add new endpoint for user settings retrieval
    - [x] Improve overall data flow for site configuration
- [x] Update .gitignore to ignore scss and map files
- [x] Add responsive styles for mobile and tablet
- [x] Update viewport meta tag for better mobile experience
- [x] Format practice date display to show only YYYY-MM-DD
- [x] Adding a class - content for better visual presentation on mobile devices
- [x] Implement contact info in footer and add API endpoint
    - [x] Added contacts endpoint constant: `/settings/contacts`
    - [x] Integrated contact data fetching in the Footer component
    - [x] Added CSS styles for the contact section in the footer

## 7. Building a better and more functional representation of errors
- [x] Upgrade login error handling
- [x] Upgrade registration error handling
- [x] Upgrade create/edit post error handling
- [x] Upgrade create/edit practice error handling
- [x] Implement custom confirmation modal for post/practice delete
- [x] Upgrade create about info error handling
- [x] Upgrade settings error handling
- [x] Upgrade Logout error handling

## 8. Add a slider for the homepage header image
- [x] Install `react-slick` slider - `npm install slick-carousel --save`
- [x] Creating a static slider for starters
- [x] Integrate dynamic slider and expand slider endpoints
    - [x] Added slider-related API endpoints to the utility configuration
    - [x] Implemented `react-slick` slider in the Home component with dynamic data
    - [x] Added conditional rendering for slider loading, success, and empty states
    - [x] Refactored `Home` to handle multiple fetch calls simultaneously
- [x] Add SliderSettings component for image uploads
- [x] Implement CRUD functionality and auto-refresh logic
    -[x] Added "Edit Slider" link to Header for admin users
    -[x] Updated useFetch hook to support a refreshTrigger for manual re-fetching
    -[x] Implemented slide deletion with confirmation modal in SliderSettings
    -[x] Added automatic UI updates after creating or deleting a slide
    -[x] Improved UX by resetting states and showing success/error messages

## 9. Unit Testing
- [x] Installing Vitest `npm install -D vitest`
- [x] Setup testing environment with Vitest and React Testing Library
- [x] Setup vitest and coverage configuration
- [x] Setup vitest with jsdom and istanbul coverage

## 10. Create tests
- [x] Add unit tests for UserLogin component
    - [x] Test validation logic for empty fields and invalid email
    - [x] Test successful login submission and context integration
    - [x] Test error handling for failed server responses
    - [x] Mock react-router navigation and verify redirection
- [x] Add unit tests for UserRegister component
    - [x] Test field validation (username, email, password)
    - [x] Test password confirmation mismatch logic
    - [x] Test redirection for already authenticated users
    - [x] Test successful registration and error handling
    - [x] Mock navigation and user context actions
- [x] Add unit tests for UserSettings component
    - [x] Added tests for required field validation and error messaging
    - [x] Verified file size constraints (2MB limit) for image uploads
    - [x] Mocked useRequest, uploadImage, and useNavigate for isolated testing
    - [x] Tested successful form submission and data pre-filling from the server
    - [x] Added test coverage for server error handling
- [x] Add unit tests for UserLogout component
    - [x] Successfully logged out and redirected to the login page
    - [x] Error logging out and displaying a modal window
    - [x] Close the modal window and redirect to the home page
- [x] Add unit tests for UserContext
    - [x] Implement tests for login and logout functionality using Vitest and React Testing Library
    - [x] Mock useRequest hook and API endpoints
    - [x] Verify state updates for isAuthenticated and isAdmin
    - [x] Test localStorage persistence and session expiration event handling
    - [x] 
- [x] Add unit tests for useRequest hook
    - [x] Verify JSON body and Content-Type headers in POST requests
    - [x] Ensure credentials: 'include' is always sent for session management
    - [x] Validate error handling and server message extraction
    - [x] Test 401 status triggers 'auth-session-expired' event
    - [x] Handle 204 No Content responses correctly
- [x] Add unit tests for useForm
    - [x] Verify initial state synchronization with formValues
    - [x] Test input sanitization (full trim for credentials, trimStart for others)
    - [x] Validate inputPropertiesRegister and filePropertiesRegister patterns
    - [x] Ensure fileChangeHandler correctly updates state with File objects
    - [x] Confirm formAction triggers callback with current data and prevents default

