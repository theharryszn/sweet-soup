import inquirer from 'inquirer'
import { createReadME, listFiles, readReadME } from './modules/Creator.js'

inquirer.prompt([
    {
        name: "action",
        type : "list",
        message : "What do you want to do",
        choices : [
            "Read a file",  
            "Create a file",
            "List all available files"
        ],
    },
]).then(answers => {
    switch(answers.action){
        case "Read a file": 
            readReadME();
            break;
        case "List all available files":
            listFiles();
            break;
        case "Create a file":
            inquirer.prompt([
                {
                    name: "content",
                    type: "input",
                    message: "Start writing to the file",
                }
            ]).then(ans => {
                createReadME(ans.content)
            })
    }
})