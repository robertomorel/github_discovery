<h2 align="center">
  Steet Home Web Application
</h2>

<p align="center">
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="ReactJS" /></a>
  <a href="https://classic.yarnpkg.com/en/docs/"><img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" alt="Yarn" /></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" /></a>
  <a href="https://jestjs.io/docs/getting-started"><img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" /></a>
  <a href="https://redux.js.org/"><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" /></a>
</p>

<br />

## About

This is an Web App built in ReactJS to serve resolvers from predefined modules.

This is an Web App built in ReactJS to simulate an application of properties rent.

### Features
- Should display input text where users can enter either a neighborhood, city, or a ZIP code
- When a user press enter or click on search, it should be redirected to the listing page, with the filter applied
- The user should enter at least one of the filter options
- There should be a widget with the last visited properties
- There should be a widget with the last most visited properties
- Display the List of properties from the API feed
- Each listing should display the main image, Price, square foot, number of beds and bathrooms
- User should have the ability to filter properties by neighborhood, city, and type of property
- Display an option to change View Style, global (it should be the default) show all listings, and by section (sections based on filter values)
- Add pagination to the page
- The detail of property for sale
- Display main image
- Display a list of the other image
- When users click on a property image, it should show a modal with a carrousel for all images [<b>NOT IMPLEMENTED YET</b>]
- By default, it displays an overview of the property, but there should be an option to `Show more...` to display the rest of the property information
- Left section showing the list of images of the properties should have scrolling up/down capabilities
- Right section should stay fixed with the property information

## Technologies

- [ReactJS]()
- [Styled Components]()
- [Axios]()
- [Jest]()
- [Redux]()
- [Context API / Hook]()
- [Apollo]()
- [React Router DOM]()
- [Lerna]()
- [Docker]()

## Running

Clone the repository:
```bash
# Clone the repository
git clone https://github.com/robertomorel/sweet-home-fullstack-project.git

# Enter in the project
cd ./sweet-home-fullstack-project/web
```

Run the following commands:
```bash
# Install all dependencies
yarn install

# Run the api
yarn start
```

### With [Docker](https://docs.docker.com/)
In the /api folder, run:

```bash
# Running the Dockerfile
docker build -t {name_image} .

# Running the docker image
docker run -d --name {container_name} -p 3000:3000 {name_image}
```

## Running Tests

Run the following command:
```bash
yarn test
```

## How to test

Follow the business rules mentioned above in order to discover all available features implemented.

----------------------

## Let´s Talk?!
- [LinkedIn](https://www.linkedin.com/in/roberto-morel-6b9065193/)
