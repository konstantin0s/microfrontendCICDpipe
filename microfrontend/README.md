### README

To start development:

`> npm install`

Then :

`> npm run start` to start the local webpack server

App: http://localhost:8080/src contains the interactive app

MFE: and http://localhost:8080/static/starter-mfe-ui.js contains the bundled MFE.

## Test BE:

The docs on how to use the test beackend API are here: https://jsonplaceholder.typicode.com/

## Objective:

Create a parent Application that will integrate this MFE. The parent application will load the list of users with their base data (i.e. name, email, and phone) each of them in a Card-like component.

When clicking/selecting one of the Cards, the selected user's ID is passed to this MFE and you will load all the user's information inside the MFE

Finally, include unitary testing for at least some of the components/logic that you add.
