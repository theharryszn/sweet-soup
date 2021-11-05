import inquirer from 'inquirer';
import Logger from './Logger.js'
import questions from './questions.js'

let mark= 0;


const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const createCountdown = (
    start,
    end,
    onComplete,
  ) => {
    let count = start;
    const interval = setInterval(() => {
      if (count === end) {
        clearInterval(interval);
        onComplete();
      }
      count++;
    }, 1000);
  }

const length = 5;

const transfromQuestions = shuffleArray(questions["english"].map((quest, i) => {
    const options = ["A","B","C","D"]
    return {
        type : "list",
        message : quest.question,
        choices : Object.keys(quest.option).map((s,i) => `${options[i]} - ` + quest.option[s]),
        name : "question-" + i,
        answer : quest.answer
    }
})).slice(0,length)

Logger.info("Exam Questions\n");
createCountdown(0, 60, () => {
    const percent = (mark / transfromQuestions.length) * 100;
    Logger.error("Time has ended : you scored " + percent + "%")
    process.exit(0);
});


inquirer.prompt(transfromQuestions).then((answers) => {
    transfromQuestions.forEach((quest, i) => {
        if(quest.answer === answers[quest.name].split(" -")[0].toLowerCase()){
            mark++
        };
    });
    const percent = (mark / transfromQuestions.length) * 100;
    if(percent > 45){
        Logger.success("Pass: You scored " + percent + "%")
        process.exit();
    }else {
        Logger.error("Fail: You scored " + percent + "%")
        process.exit()
    }
})