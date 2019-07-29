import { Questions } from 'inquirer';

import { IPlayerQuestion, IPredictorQuestion, IRetryQuestion } from 'typings/inquirer';
import { validatePlayerAnswer, validatePredictorAnswer } from './validator';

export const mainQuestion: Questions = [
    {
        type: 'input',
        name: 'begin',
        message: 'Welcome to the game!',
        default: true,
    },
];

export const playerQuestion: Questions<IPlayerQuestion> = [
    {
        type: 'input',
        name: 'player',
        message: 'AI is the predictor, what is your input?',
        validate: validatePlayerAnswer,
    },
];

export const predictorQuestion: Questions<IPredictorQuestion> = [
    {
        type: 'input',
        name: 'predictor',
        message: 'You are the predictor, what is your input?',
        validate: validatePredictorAnswer,
    },
];

export const retryQuestion: Questions<IRetryQuestion> = [
    {
        type: 'confirm',
        name: 'retry',
        message: 'Do you want to play again?',
    },
];
