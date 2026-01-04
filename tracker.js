const fs = require("fs");
const { getClientCredentialsGrant, sleep, getBeatmap, logInfo, logDefault } = require('./helpers');

async function generate() {
    const buffer = fs.readFileSync('sheet.csv');
    const csv = buffer.toString(); // expected .csv format is artist,title,(beatmapsetIds separated by "/")

    if (!csv) {
        console.log(`couldn't read csv`);
        return;
    }

    const response = await getClientCredentialsGrant();
    const token = response.access_token;

    const rows = csv.split(`\r\n`);

    let output = '';
    
    for (const row of rows) {
        const columns = row.split(',');

        logDefault(`${columns[0]} - ${columns[1]}`);

        const beatmapsetIdsColumn = columns[2];
        const beatmapsetIds = beatmapsetIdsColumn.split('/');

        let playcount = 0;
        let passcount = 0;
        
        for (const id of beatmapsetIds) {
            const intId = parseInt(id);

            if (!isNaN(intId)) {
                const beatmapset = await getBeatmap(token, id);
                await sleep(250);

                for (const beatmap of beatmapset.beatmaps) {
                    playcount += parseInt(beatmap.playcount);
                    passcount += parseInt(beatmap.passcount);
                }
            }
        }

        logInfo(playcount);
        logInfo(passcount);

        if (playcount > 0 && passcount > 0) {
            output += `${columns[0]},${columns[1]},${columns[2]},${playcount},${passcount}\n`
        }
    }

    fs.writeFile('output.csv', output, (error) => {
        if (error) throw err;
    });

    logDefault('done');
}

generate();