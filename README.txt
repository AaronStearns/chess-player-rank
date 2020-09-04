To Run:

First, install React.js if not already installed: 

`npm install react react-dom --save`

In the project directory, first run:

`npm install`

to install the node modules. Then:

`yarn start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

------------------------------------------

Component hierarchy of app:

App.js
---Soldiers.js
------Legend.js
------SoldierDisplay.js

With a working back-end, all data for soldiers to be displayed in the UI would be 
fetched with a GET request in the Soldiers.js component, then passed to Legend.js and 
SoldierDisplay.js

For now, data for an array of soldiers is hard-coded in the Soldiers.js state 
and passed to its child components. 


