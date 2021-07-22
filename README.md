<h2 align="center">
  GitHub Discovery Web Application
</h2>

<p align="center">
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="ReactJS" /></a>
  <a href="https://classic.yarnpkg.com/en/docs/"><img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" alt="Yarn" /></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" /></a>
  <a href="https://jestjs.io/docs/getting-started"><img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" /></a>
  <a href="https://redux.js.org/"><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" /></a>
</p>

<h2 align="center">
  🚀 This is an amazing APP to list GitHub accounts 🚀
</h2>

<br />

## About
This is an Web App built in ReactJS to simulate an application to list github accounts by user name.

### Features
- After the app is launched, the **Search** component is displayed;
- The user enters a random String value into to the 'Login' field and clicks the 'Submit' button;
- The app sends a http request to `https://api.github.com/search/users?q={login} in:login`, where {login} is the String value entered by the user;
- The app then parses the response from the server. If data is returned, the **Results** component should display the fetched values. If there is an issue with the request, then an error message should be displayed;
- The app has to compile and run without issue. It should be stable and reasonably fool-proof, handling all obvious test cases;
- The app should contain basic tests, with  >50% code coverage;
- Mobile layout responsive;
- Can search with no string in the field (at least 3 char.);
- CI/CD with Github and Netlify.

## Technologies
- [ReactJS]()
- [Styled Components]()
- [Axios]()
- [Jest]()
- [Redux]()
- [Context API / Hook]()
- [React Router DOM]()
- [Docker]()

## Running
I´ve separated three different ways to run this project by almost a single command

> To access the deployed application, click [here](https://gh-discovery.netlify.app/)

Clone the repository:
```bash
# Clone the repository
https://github.com/robertomorel/github_discovery.git

# Enter in the project
cd ./github_discovery
```

Run the following commands:
```bash
# Install all dependencies
yarn install

# Run the api
yarn start
```

### With [Docker](https://docs.docker.com/)
In the root folder, run:

```bash
# Running the Docker Compose
docker-compose up
```

### With Bash Script
In the root folder, run:

```bash
# Running the Docker Compose
bash ./init.sh
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
