const fs = require('fs');
const { exec } = require('child_process');
const randomSentence = require('random-sentence');
const util = require('util');
const execPromise = util.promisify(exec);
const moment = require('moment');


// File path to the text file
const filePath = './commit.txt';

const sentences = [];

const randomNumberInRange = 4 + Math.random() * (7 - 4);

for (let i = 0; i < randomNumberInRange; i++) {
    const sentenceToAppend = randomSentence({ min: 4, max: 9 });
    sentences.push(sentenceToAppend);
}

const appendToFile = (msg) => {
    fs.appendFileSync(filePath, msg);
}

const bashScriptPath = './gitScript.sh';

const runCommands = async (array) =>{
    for(let i =0; i < array.length; i++){
        appendToFile(array[i]);
        // Execute the Bash script
        const { stdout: result } = await execPromise(`bash ${bashScriptPath} "${new Date().toISOString().split("T")[0]} - ${i + 1}"`);
        console.log(result)
    }
}

runCommands(sentences);

const currentDate = moment();

// Get the next day's date
const nextDayDate = currentDate.add(1, 'days');
console.log('Next Day Date:', nextDayDate.format('YYYY-MM-DD'));
