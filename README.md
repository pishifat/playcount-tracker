get playcount/passcount on all difficulties of a set or multiple sets

1. create `config.json` based on `config.example.json`
2. `npm i`
3. add `sheet.csv` to directory in format below
4. `node tracker.js`
5. replace initial sheet with `output.csv`

| artist | title | beatmapset IDs* | total plays | total passes |
| :-- | :-- | :-- | :-- | :-- |
| x | x | ID | x | x |
| x | x | ID/ID/ID | x | x |

*: multiple beatmapset IDs can be separated by "/" for cumulative counts