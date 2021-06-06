# Admin UI

This code attempts to build a solution to the problem defined by [Geektrust](https://www.geektrust.in/coding-problem/frontend/adminui?utm_source=newsletter&utm_medium=email&utm_campaign=nlmay2021&utm_content=adminui).

The project is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Functionality Available:

An Administrator can use this UI dashboard to view all the user with one page at a time. Admin can also edit or delete individual user from the user rows.

Admin can use the search bar given at the top to filter users by name, email or their role.

Admin can use the checkbox at the header to select or deselect items displayed in current page.

## Development Notes:

- This project uses React.js to create UI by composing smaller components. 
- A global state store is used whenever there was a need to share data between multiple components.
- Unit tests have been added for individual components
- The code is organized into Pages and Components. Page components need store to operate where as common components does not depend on any external data store.
- Typescript has been used to add support for type safety.
- This was a simple application, hence state management is handled with ReactContext apis and hooks, but in more complex project a Redux kind of state store would be more suitable.

## Available Scripts

Navigate to the project directory

### Starting the dev server:
> #### `npm start`

This command runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Running tests:
> #### `npm test`

This command launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


### Building the project for deployment:
> #### `npm run build`

This will build the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
