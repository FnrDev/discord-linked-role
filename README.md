# Linked Role example app

This repository contains the documentation and example for a linked role bot.

## Running app locally

Before you start, you'll need to [create a Discord app](https://discord.com/developers/applications) with the `bot` scope

Configuring the app is covered in detail in the [tutorial](https://discord.com/developers/docs/tutorials/configuring-app-metadata-for-linked-roles).

### Setup project

First clone the project:
```
git clone https://github.com/FnrDev/discord-linked-role.git
```

Then navigate to its directory and install dependencies:
```
cd discord-linked-role
npm install
```

### Get app credentials

Fetch the credentials from your app's settings and add them to a `.env` file. You'll need your bot token (`DISCORD_TOKEN`), client ID (`DISCORD_CLIENT_ID`), client secret (`DISCORD_CLIENT_SECRET`). You'll also need a redirect URI (`DISCORD_REDIRECT_URI`) and a randomly generated UUID (`COOKIE_SECRET`), which are both explained below:

```dotenv
DISCORD_CLIENT_ID: <your OAuth2 client Id>
DISCORD_CLIENT_SECRET: <your OAuth2 client secret>
DISCORD_TOKEN: <your bot token>
DISCORD_REDIRECT_URI: https://<your-project-url>/discord-oauth-callback
COOKIE_SECRET: <random generated UUID>
REDIS_URL: <your redis url>
```

For the UUID (`COOKIE_SECRET`), you can run the following commands:

```bash
$ node
crypto.randomUUID()
```

Copy and paste the value into your `.env` file.

Fetching credentials is covered in detail in the [linked roles tutorial](https://discord.com/developers/docs/tutorials/configuring-app-metadata-for-linked-roles).

### Running your app

After your credentials are added, you can run your app:

```
$ npm start
```

And, just once, you need to register you connection metadata schema. In a new window, run:

```
$ npm run register
```

### Set up interactivity

The project needs a public endpoint where Discord can send requests. To develop and test locally, you can use something like [`ngrok`](https://ngrok.com/) to tunnel HTTP traffic.

Install ngrok if you haven't already, then start listening on port `3000`:

```
$ ngrok http 3000
```

You should see your connection open:

```
Tunnel Status                 online
Version                       2.0/2.0
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://1234-someurl.ngrok.io -> localhost:3000
Forwarding                    https://1234-someurl.ngrok.io -> localhost:3000

Connections                  ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

Copy the forwarding address that starts with `https`, in this case `https://1234-someurl.ngrok.io`, then go to your [app's settings](https://discord.com/developers/applications).

On the **General Information** tab, there will be an **Linked Roles Verification URL**. Paste your ngrok address there, and append `/linked-role` (`https://1234-someurl.ngrok.io/linked-role` in the example).

You should also paste your ngrok address into the `DISCORD_REDIRECT_URI` variable in your `.env` file, with `/discord-oauth-callback` appended (`https://1234-someurl.ngrok.io/discord-oauth-callback` in the example). Then go to the **General** tab under **OAuth2** in your [app's settings](https://discord.com/developers/applications), and add that same address to the list of **Redirects**.

Click **Save Changes** and restart your app.
