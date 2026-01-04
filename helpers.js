const colors = require("colors");
const config = require("./config.json");
const axios = require("axios");
const querystring = require('querystring');

// get client credentials
async function getClientCredentialsGrant() {
    const postData = querystring.stringify({
        grant_type: 'client_credentials',
        client_id: config.id,
        client_secret: config.secret,
        scope: 'public',
    });

    const options = {
        method: 'post',
        url: 'https://osu.ppy.sh/oauth/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: postData,
    };

    try {
        const res = await axios(options);

        return res.data;
    } catch (error) {
        return { error };
    }
}

// get beatmap
async function getBeatmap(token, setId) {
    const options = {
        method: 'GET',
        url: `https://osu.ppy.sh/api/v2/beatmapsets/${setId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await axios(options);

        return res.data;
    }
     catch (error) {
        return { error };
    }
}

// sleep (avoid rate limit)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// log colors
function logDefault (message) {
	console.log(message.bgBlue.black);
}

function logInfo (message) {
    message = message.toString();
	console.log(message.bgCyan.black);
}

module.exports = {
    getClientCredentialsGrant,
    getBeatmap,
    sleep,
    logDefault,
    logInfo,
};