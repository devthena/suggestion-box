# Suggestion Box <img src="https://img.icons8.com/?size=100&id=123603&format=png&color=000000" alt="React" width="24" height="24" /> <img src="https://img.icons8.com/?size=100&id=nCj4PvnCO0tZ&format=png&color=000000" alt="TypeScript" width="24" height="24" /> <img src="https://img.icons8.com/?size=100&id=gFw7X5Tbl3ss&format=png&color=000000" alt="Material UI" width="24" height="24" /> <img src="https://img.icons8.com/?size=100&id=QBqFNfPPB2Kx&format=png&color=000000" alt="Sass" width="24" height="24" />

This web application lets users view and submit feedback and suggestions.

It is built using React with Create React App and TypeScript, leveraging Material UI for components and SCSS modules for styling. This application uses the Context API and the useReducer hook as the in-memory data provider.

## Features

- **View Comments** - Selecting a suggestion will display the thread of comments in a separate feed
- **View Suggestions** - All suggestions will be displayed in a feed where users can click to see the details
- **Generate Comment** - Add a randomly generated comment for a selected suggestion
- **Generate Suggestion** - Add a randomly generated suggestion object to the feed
- **Add Comments** - There is an input field for user to send a comment on a selected suggestion
- **Add Suggetions** - User would be able to open a modal and submit a form to add a new suggestion

## Installation

To setup the application in your dev environment:

```bash
  $ git clone https://github.com/devthena/suggestion-box.git
  $ cd suggestion-box
  $ yarn install
```

## Running and Testing

The app will be available at `http://localhost:3000`. To run locally:

```bash
  $ yarn start
```

There are available tests for some components. To run these tests:

```bash
  $ yarn test
```

## Screenshots

The following are screenshots of the desktop and mobile views of the application

![Desktop Suggestion Feed](https://cdn.discordapp.com/attachments/1012125303897849896/1284056051515392000/image.png?ex=66e53de3&is=66e3ec63&hm=76668d16635f8513a1f22400e0bcfbd4c9af2dcefeaeebb8b7e14d8b72e4b306&)

![Desktop Suggestion Create](https://cdn.discordapp.com/attachments/1012125303897849896/1284056051909660734/image.png?ex=66e53de3&is=66e3ec63&hm=de1d5606d07deaf95551e8e5b7c0cfe1015b9165876817e7d044b279545494d7&)

![Desktop Suggestion Details](https://cdn.discordapp.com/attachments/1012125303897849896/1284056052467499062/image.png?ex=66e53de3&is=66e3ec63&hm=9cb857b267cdf7516de60c20d13635d4f1b73b8f54cc1d1acb0b326e591f3c25&)

![Mobile Suggestion Feed](https://cdn.discordapp.com/attachments/1012125303897849896/1284056052928610304/image.png?ex=66e53de3&is=66e3ec63&hm=b9fcbaaa74bb3e848119dfe171495ee24682f114e5b62cf206d69d9f5aa1d20e&)

![Mobile Suggestion Create](https://cdn.discordapp.com/attachments/1012125303897849896/1284056053344112711/image.png?ex=66e53de3&is=66e3ec63&hm=baabf4c67227e0d1b9f707591f7c10966063f8c906ed9c14682099927e73e98f&)

![Mobile Suggestion Details](https://cdn.discordapp.com/attachments/1012125303897849896/1284056053885173760/image.png?ex=66e53de3&is=66e3ec63&hm=4d20d96bf1b44ebf46e8068296163d032b2d41b31dfa2ba8d4bbd6aad4bd6e43&)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
