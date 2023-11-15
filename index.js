const fs = require('fs');
const { exec } = require('child_process');
const randomSentence = require('random-sentence');
const util = require('util');
const execPromise = util.promisify(exec);
const moment = require('moment');
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


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


const sentences = [];

const randomNumberInRange = 1 + Math.random() * (10 - 1);

for (let i = 0; i < randomNumberInRange; i++) {
    const sentenceToAppend = randomSentence({ min: 1, max: 8 });
    sentences.push(sentenceToAppend);
}

runCommands(sentences);

// Get the next day's date
const currentDate = moment();
const nextDayDate = currentDate.add(1, 'days');
console.log(nextDayDate)
