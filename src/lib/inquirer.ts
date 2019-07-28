import { Questions } from 'inquirer';
import { IPlayerQuestion, IPredictorQuestion, IRetryQuestion } from 'typings/inquirer';

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
        validate: (input) => {
            if (input.length > 2) {
                return 'Bad input: no prediction expected, you are not the predictor.';
            }

            return true;
        },
    },
];

export const predictorQuestion: Questions<IPredictorQuestion> = [
    {
        type: 'input',
        name: 'predictor',
        message: 'You are the predictor, what is your input?',
        validate: (input) => {
            if (input.length < 3) {
                return 'Bad input: correct input should be of the form CC3,' +
                'where the first two letters indicate [O]pen or [C]losed state for each hand,' +
                'followed by the prediction (0-4).';
            }

            const [, , prediction] = input.split('');
            if (parseInt(prediction, 10) > 4) {
                return 'Bad input: prediction should be in the range of 0-4.';
            }

            return true;
        },
    },
];

export const retryQuestion: Questions<IRetryQuestion> = [
    {
        type: 'confirm',
        name: 'retry',
        message: 'Do you want to play again?',
    },
];
