import 'node:process';
import 'dotenv/config'

const url = `https://discord.com/api/v10/applications/${process.env.DISCORD_CLIENT_ID}/role-connections/metadata`;

const body = [
    {
      key: 'cookieseaten',
      name: 'Cookies Eaten',
      description: 'Cookies Eaten Greater Than',
      type: 2,
    },
    {
      key: 'allergictonuts',
      name: 'Allergic To Nuts',
      description: 'Is Allergic To Nuts',
      type: 7,
    },
    {
      key: 'bakingsince',
      name: 'Baking Since',
      description: 'Days since baking their first cookie',
      type: 6,
    },
];

(async () => {
    const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        }
    });
    
    if (response.ok) {
        response.json().then(console.log);
    } else {
        response.text().then(console.log);
    }
})();