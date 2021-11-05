import { readdir, readdirSync, readFile, writeFile } from 'fs'
import { join } from 'path';
import { FOLDER_PATH, EXTENSION } from './constants.js';
import logger from './Logger.js'
import inquirer from 'inquirer'

export const createReadME = (content) => {
    const date = new Date();
    const name = `doc-${date.getDay()}-${date.getMonth()}-${date.getFullYear()}-${date.getHours()}-${date.getMilliseconds()}`
    const filename = join(FOLDER_PATH,`${name}.${EXTENSION}`,)
    writeFile(filename,content, {encoding : "utf-8"}, (err) => {
        if(err){
            logger.error("An Error Occured" + err.message);
            return
        }
        logger.success("File created successfully: " + filename)
    })
}

export const listFiles = () => {
    readdir(FOLDER_PATH,(err, files) => {
        if(err){
            logger.error("Error reading directory: " + err.message);
            return;
        }

        if(files.length == 0) {
            logger.success("No files available");
            return;
        }

        logger.success("Here are the files available.")
        files.filter(name => name.endsWith(".md")).forEach((name, i) => {
            logger.info(`${i + 1}. ${name}`)
        })
    })
}

export const readReadME = () => {
    try {
        inquirer.prompt([
            {
                type: "list",
                name : "file",
                message: "Which file do you want to read.",
                choices : readdirSync(FOLDER_PATH)
            }
        ]).then(answers => {
            readFile(join(FOLDER_PATH,answers.file), (err, data) => {
                if(err){
                    throw err
                }

                console.log("");
                logger.success("File read successfully");
                logger.info(data)
            })
        })
    } catch (error) {
        logger.error("Error occured: " + error)
    }
   
}