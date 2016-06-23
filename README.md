# onboarding-bot
Brief new employees about onboarding activities via Slack

To set-up a development environment, first have [node](https://nodejs.org) installed, then install our dependencies:

`npm install`

Then install the global mocha CLI for running tests:

`npm install -g mocha`

To run tests, type `npm run test` or `npm run test:watch`. The specs it runs exist in the `test/` directory.

Create a `config.json` file in the root of the project folder, and populate it with the template below, customizing appropriately (i.e. Slack bot user API [token](https://api.slack.com/bot-users))

```json
{
  "settings": {
    "dev": {
      "debug": "true"
    },
    "prod": {
      "debug": "false"
    }
  },
  "authentication": {
    "token": "REPLACE_THIS_WITH_SLACK_API_TOKEN"
  }
}
```

Set up your database by making sure you have `postgres` (9.5.x) installed on your machine. Once you have Postgres installed, run `npm run setupdb`. If you'd like to delete or reset the onboarding-bot's database, run `npm run dropdb` or `npm run resetdb` respectively.

The bot uses some natural language processing to enable conversation interaction. The sample text its trained upon exists in `bot/training.json`. The keys e.g. `member_info` hook into functionality specified in `bot/handlers/` directory and `bot/response.js` file.
