import { IPlayerQuestion, IPredictorQuestion } from 'typings/inquirer';

const choices: string[] = ['O', 'C'];

function hasCorrectChoices(value: string, _i: number, _arr: string[]): boolean {
    return choices.includes(value);
}

export function validatePlayerAnswer(
    input: string,
    _answers: IPlayerQuestion = {} as IPlayerQuestion,
): boolean | string {
    if (input.length !== 2) {
        return 'Bad input: no prediction expected, you are not the predictor.';
    }

    const hands = input.split('');
    if (!hands.every(hasCorrectChoices)) {
        return 'Bad input: correct input can only be two letter [O]pen or [C]losed state for each hand';
    }

    return true;
}

export function validatePredictorAnswer(
    input: string,
    _answers: IPredictorQuestion = {} as IPredictorQuestion,
): boolean | string {
    if (input.length !== 3) {
        return 'Bad input: correct input should be of the form CC3,' +
            'where the first two letters indicate [O]pen or [C]losed state for each hand,' +
            'followed by the prediction (0-4).';
    }

    const hands = input.slice(0, 2).split('');
    if (!hands.every(hasCorrectChoices)) {
        return 'Bad input: correct input can only be two letter [O]pen or [C]losed state for each hand';
    }

    const prediction = parseInt(input.slice(2, 3), 10);
    if (prediction > 4) {
        return 'Bad input: prediction should be in the range of 0-4.';
    }

    return true;
}
