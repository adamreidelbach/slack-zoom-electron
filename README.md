# Slack-Zoom-Electron

This app seeks to provide a convenient way to indicate to fellow Slack users that you are in a Zoom meeting. The basis of this project is built around [Elijah Manor's](https://twitter.com/elijahmanor) Gist that does exactly that, [check it out](https://gist.github.com/elijahmanor/8c03d061f265596cb87140d88414354d).

## Getting Started

1. clone the repo
2. run `npm install` at the root of the directory
3. You will need to retrieve your Slack token, which can be found [here](https://api.slack.com/docs/oauth-test-tokens), under __Legacy token generator__. Treat this token like you would any other password, it is not something that should be publicly shared.
4. Retrieve your slack userId, which can be found [here](https://api.slack.com/methods/auth.test/test). You will need to provide the previously mentioned Slack token.
5. Create a `.env` file at the root of this project to store your slack userId and token. That file should look something like this:
```
SLACK_TOKEN="xoxp-XXXXXXXXXX-XXXXXXXXXX"
SLACK_USER_ID="123ABC123"
```
6. run `npm start`

This project uses a `setTimeout` interval inside of `slack-zoom.js`, which can be modified to your desired length. By default, it is set to check for Zoom activity every 15 seconds.

Additionally, you can modify the code in `slack-zoom.js` to check whether or not your camera is in use, instead of checking to see if Zoom is running. This uses [is-camera-on](https://www.npmjs.com/package/is-camera-on), which would need to be installed. You'll see the necessary code commented out.

## Additional Credits

[Electron Quick Start](https://github.com/electron/electron-quick-start)

[Menubar](https://github.com/maxogden/menubar)

Menu icons made by [Smashicons](https://www.flaticon.com/authors/smashicons) from [www.flaticon.com](https://www.flaticon.com/)
