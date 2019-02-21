# Weather app

Simple weather app. Working version at: http://scientific-crate.surge.sh/

# Functionality
# Home page: Cities.js

- Selected cities are listed
- First city is your country’s capital (set as default)
- Clicking on the ”+” sign opens the Add City page
- Clicking on the city name opens the Weather page

# Add City page: AddCity.js

- The page has an autocomplete field
- You can search capitals by name
- Search results are highlighted (only 8 items maximum)
- Capitals already in selected are hidden
- Selected capital can be saved with the SAVE button
- The SAVE button only visible if a valid capital is selected

# Weather page: Weather.js

- You can see the selected city’s name
- You can see the city’s current time in 24h format (it’s a working clock)
- You can see the current weather icon and description
- You can see the current temperature, the sunrise and sunset time

# Technical details
# API endpoints: api.js

- Weather: openweathermap.org
- Location: api.ipdata.co

# Country,Capital,Timezone  data

- countries.json from https://gist.github.com/erdem/8c7d26765831d0f9a8c62f02782ae00d
- downloaded as a whole to the client side (due to the small size)
- functions in capitals.js

# Code

- Basic CRA setup

- Redux, Redux-Thunk
actions in actions.js, 
reducer in reducers.js

- React-Router
not connected to store
Navbar.js for navigation

- Responsive design, SCSS, BEM syntax

- Persistent storage: localStorage

- Commenting: Using meaningful names, or JSDoc if necessary