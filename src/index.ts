import inquirer from 'inquirer';

import Game from './lib/game';
import { mainQuestion, playerQuestion, predictorQuestion, retryQuestion } from './lib/inquirer';
import { IPlayerQuestion, IPredictorQuestion, IRetryQuestion } from './typings/inquirer';

const game = new Game();
let isPredictor = true;
let isGameOver = false;

function throwError(err: Error) {
    throw err;
}

function main() {
    inquirer.prompt(mainQuestion)
        .then(predictorTurn)
        .catch(console.error);
}

function playerTurn(): void {
    inquirer.prompt<IPlayerQuestion>(playerQuestion)
        .then(playerTurnResolve)
        .catch(throwError);
}

function playerTurnResolve(answer: IPlayerQuestion): void {
    if (!isGameOver) {
        const end = game.begin(answer.player, isPredictor);
        if (!end) {
            isPredictor = true;
            console.log('No winner.');
            return predictorTurn();
        }

        isGameOver = true;
        console.log('AI WIN!!');
        retry();
        return;
    }
}

function predictorTurn(): void {
    inquirer.prompt<IPredictorQuestion>(predictorQuestion)
        .then(predictorTurnResolve)
        .catch(throwError);
}

function predictorTurnResolve(answer: IPredictorQuestion): void {
    if (!isGameOver) {
        const end = game.begin(answer.predictor);
        if (!end) {
            isPredictor = false;
            console.log('No winner.');
            return playerTurn();
        }

        isGameOver = true;
        console.log('You WIN!!');
        retry();
        return;
    }
}

function retry(): void {
    inquirer.prompt<IRetryQuestion>(retryQuestion)
        .then(retryResolve)
        .catch(throwError);
}

function retryResolve(answer: IRetryQuestion): void {
    if (answer.retry) {
        isGameOver = false;
        return main();
    }

    console.log('Ok, bye!');
    process.exit(0);
}

main();
