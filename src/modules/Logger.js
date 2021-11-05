import chalk from "chalk"

const logger = {
    info(text){
        console.log(chalk.blue(text));
    },
    success(text){
        console.log(chalk.green(text));
    },
    error(text){
        console.log(chalk.red(text));
    }
}

export default logger;