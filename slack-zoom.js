module.exports = () => {
  // Update the slack token here https://api.slack.com/docs/oauth-test-tokens
  const SLACK_TOKEN = process.env.SLACK_TOKEN;
  // Update your slack userId here https://api.slack.com/methods/auth.test/test
  const SLACK_USER_ID = process.env.SLACK_USER_ID;
  // Update time interval to check for Zoom process (in milliseconds)
  const INTERVAL = 15000;

  const { RTMClient, WebClient } = require("@slack/client");
  const notifier = require("node-notifier");
  const chalk = require("chalk");
  //const isCameraOn = require("is-camera-on");
  const processExists = require("process-exists");
  const path = require("path");
  const LOG_OPTIONS = {
    month: "2-digit",
    hour: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    year: "2-digit"
  };

  let isRunning = false;

  function checkZoom() {
    global.setTimeout(async function refresh() {
      // const isOn = await isCameraOn();
      const isOn = await processExists("zoom.us");
      if ((isOn && !isRunning) || (!isOn && isRunning)) {
        isRunning = isOn;
        updateStatus(isRunning);
      }
      global.setTimeout(refresh, INTERVAL);
    }, INTERVAL);
  }

  function updateStatus(isRunning) {
    const message = isRunning ? "Joining a Zoom call" : "Leaving a Zoom call";
    notifier.notify({
      title: "Slack Zoom Status",
      icon: path.join(__dirname, "assets", "zoom.png"),
      sound: true,
      message
    });
    console.log(`${chalk.yellow(new Date().toLocaleString("en-US", LOG_OPTIONS))}: ${message}`);

    web.users.info({ user: SLACK_USER_ID }).then(
      () => {
        // https://api.slack.com/methods/users.profile.set
        web.users.profile.set({
          profile: {
            status_text: isRunning ? "On a zoom call..." : "",
            status_emoji: isRunning ? ":zoom:" : ""
          }
        });
      },
      error => console.log("ERROR: web.users.info", error)
    );
  }

  const rtm = new RTMClient(SLACK_TOKEN);
  rtm.start();
  const web = new WebClient(SLACK_TOKEN);

  rtm.on("authenticated", function (rtmStartData) {
    console.info(`\nLogged into Slack as ${chalk.blue(rtmStartData.self.name)}\n`);
    checkZoom();
  });
}

