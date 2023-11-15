const fs = require('fs');
const { exec } = require('child_process');
const randomSentence = require('random-sentence');
const util = require('util');
const execPromise = util.promisify(exec);
const moment = require('moment');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// File path to the text file
const filePath = './commit.txt';

const bashScriptPath = './gitScript.sh';

const appendToFile = (msg) => {
    fs.appendFileSync(filePath, msg);
}

const runCommands = async (array) => {
    for (let i = 0; i < array.length; i++) {
        appendToFile(array[i]);
        // Execute the Bash script
        const { stdout: result } = await execPromise(`bash ${bashScriptPath} "${new Date().toISOString().split("T")[0]} - ${i + 1}"`);
        console.log(result)
    }
}

// const currentDate = moment();

// console.log('Next Day Date:', nextDayDate.format('YYYY-MM-DD'));


app.get('/run', async (req, res) => {

    const sentences = [];

    const randomNumberInRange = 4 + Math.random() * (7 - 4);

    for (let i = 0; i < randomNumberInRange; i++) {
        const sentenceToAppend = randomSentence({ min: 4, max: 9 });
        sentences.push(sentenceToAppend);
    }

    await runCommands(sentences);

    const { stdout: result } = await execPromise(`date -s "2023-01-01 12:00:00"`);
    console.log(result)
    console.log('date: ', new Date())

    // Get the next day's date
    const currentDate = moment();
    const nextDayDate = currentDate.add(1, 'days');
    res.send({date: nextDayDate.format('YYYY-MM-DD')})
});

app.listen(4500, () => {
    console.log('Server running on PORT 4500')
})