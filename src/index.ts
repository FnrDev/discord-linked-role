import 'node:process';
import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { getOAuthTokens, getOAuthURL, getUserData, pushMetaData } from './utils/utils';

// Basic
export const DiscordStorage = new Map();

const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/linked-role", (req, res) => {
    const { state, url } = getOAuthURL();

    res.cookie("clientState", state, { maxAge: 1000 * 60 * 5, signed: true });

    res.redirect(url);
})

app.get("/discord-oauth-callback", async (req, res) => {
    const code = req.query.code as string;
    const discordState = req.query.state as string;

    const { clientState } = req.signedCookies;
    if (clientState !== discordState) {
        console.error("State verification failed");
        return res.sendStatus(403);
    }

    const tokens: any = await getOAuthTokens(code);
    const userData: any = await getUserData(tokens);
    const userId = userData.user.id;

    DiscordStorage.set(userId, {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: Date.now() + tokens.expires_in * 1000,
    });

    await updateMetaData(userId);

    res.send("You did it! NOW go back to discord");
})

async function updateMetaData(userId: string) {
    const tokens = await DiscordStorage.get(userId);
    const metaData = {
        cookieseaten: 1483,
        allergictonuts: 0, // 0 for false, 1 for true
        firstcookiebaked: '2003-12-20',
    };

    await pushMetaData(userId, tokens, metaData);
}

app.listen(8787, () => console.log("App running at port 8787"));