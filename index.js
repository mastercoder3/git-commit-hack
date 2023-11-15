const fs = require('fs');
const { exec } = require('child_process');
const randomSentence = require('random-sentence');
const util = require('util');
const execPromise = util.promisify(exec);

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

// sentences?.map(async (data, index) => {
//     appendToFile(data);
//     // Execute the Bash script
//     const { stdout: result1 } = await execPromise(`bash ${bashScriptPath} "${new Date().toISOString().split("T")[0]} - ${index + 1}"`);
//     // exec(`bash ${bashScriptPath} "${new Date().toISOString().split("T")[0]} - ${index + 1}"`, (err, stdout, stderr) => {
//     //     if (err) {
//     //         console.error(`Error running the Bash script: ${stderr}`);
//     //         return;
//     //     }

//     //     console.log('Git add and commit successful!');
//     // });
// })


console.log(sentences);