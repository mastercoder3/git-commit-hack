const fs = require('fs');
const { exec } = require('child_process');
const randomSentence = require('random-sentence');

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

sentences?.map((data, index) => {
    appendToFile(data);
    // Execute the Bash script
    exec(`bash ${bashScriptPath} "${new Date().toISOString().split("T")[0]} - ${index + 1}"`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error running the Bash script: ${stderr}`);
            return;
        }

        console.log('Git add and commit successful!');
    });
})


console.log(sentences);