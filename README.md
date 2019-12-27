

# expo-notifications-app

![Preview-Screens](https://github.com/steniowagner/expo-notifications-dashboard/blob/master/img/flow.png)

If you want to take a look on all screens of the App, they are [here](https://github.com/steniowagner/expo-notifications-dashboard/tree/master/img).


## About this Project

The idea of the App is:

_"Be a dashboard for sending notifications for specific users (or all users) from some datasource"._

## Why?

This project is part of my personal portfolio, so, I'll be happy if you could provide me any feedback about the project, code, structure or anything that you can report that could make me a better developer!

Email-me: stenio.wagner1@gmail.com

Connect with me at [LinkedIn](https://www.linkedin.com/in/steniowagner/).

Also, you can use this Project as you wish, be for study, be for make improvements or earn money with it!

It's free!

## Some Observations about this App

- This app uses Typescript, so, if you never used it before with React, this project could be a very good kickstart for you (I'm still learning, ok?  😉).

- This project uses the React hooks all around (useCallback, useState, useEffect...), so, if you want to see these features in action, take a look on the project!

- Speaking about hooks, this project shares a specific functionality with the [expo-notifications-app](https://github.com/steniowagner/expo-notifications-app), that is the functionality to fetch data using HTTP protocol. Both projects use exactly the same implementation, take a look: [expo-useFetch](https://github.com/steniowagner/expo-notifications-app/blob/master/src/hooks/useFetch.ts) and [web-useFetch](https://github.com/steniowagner/expo-notifications-dashboard/blob/master/src/hooks/useFetch.ts).
This is a perfect example of how we can share code using hooks, we can write the functionality once and reuse them on the web, mobile and wherever you can use React!

- This Dashboard is connected to the [expo-notifications-api](https://github.com/steniowagner/expo-notifications-api), but you can easily change to your own server and reuse all the functionality on this Dashboard and then be able to get the users and send notifications to your own server!

## Getting Started

### Prerequisites

To run this project in the development mode, you'll need to have a basic environment to run a React App, that can be found [here](https://reactjs.org/docs/getting-started.html).

Also, you'll need to the server running locallyon your network. You can find the server and all the instructions to start the server [here](https://github.com/steniowagner/expo-notifications-api).

### Installing

**Cloning the Repository**

```
$ git clone https://github.com/steniowagner/expo-notifications-dashboard

$ cd expo-notifications-dashboard
```

**Installing dependencies**

```
$ yarn
```

_or_

```
$ npm install
```

### Running

With all dependencies installed and the environment properly configured, you can now run the dashboard:

Android

```
$ yarn start
```


## Built With

- [React](https://reactjs.org/) - Build the Dashboard
- [Typescript](https://www.typescriptlang.org/) - Programming language used
- [MaterialUI](https://material-ui.com/) - UI using Material Design
- [ESlint](https://eslint.org/) - Linter
- [Prettier](https://prettier.io/) - Code Formatter
- [Babel](https://babeljs.io/) - JavaScript Compiler
- [Styled-Components](https://www.styled-components.com/) - Styles
- [Husky](https://github.com/typicode/husky) - Git hooks
- [Lint-Staged](https://github.com/okonet/lint-staged) - Run linters on git staged files


## Contributing

You can send how many PR's do you want, I'll be glad to analyse and accept them! And if you have any question about the project...

Email-me: stenio.wagner1@gmail.com

Connect with me at [LinkedIn](https://www.linkedin.com/in/steniowagner/)

Thank you!

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/steniowagner/expo-notifications-dashboard/blob/master/LICENSE) file for details.
