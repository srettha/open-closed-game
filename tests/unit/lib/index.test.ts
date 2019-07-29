import Game from '../../../src/lib/game';
import { IGame } from '../../../src/typings/game';

describe('Game', () => {
    let game: IGame;

    const expectedChoices = ['O', 'C'];
    const expectedPrediction = [1, 2, 3, 4];

    beforeEach(() => {
        game = new Game();
    });

    it('should exist', () => {
        expect(game).toBeTruthy();
    });

    describe('begin()', () => {
        it('should use given answer from player (lose)', () => {
            const expected = false;
            game.getRandomAnswerForPredictor = jest.fn().mockReturnValueOnce('CC1');

            const actual = game.begin('CC', false);
            expect(actual).toEqual(expected);
        });

        it('should use given answer from player (win)', () => {
            const expected = true;
            game.getRandomAnswerForPredictor = jest.fn().mockReturnValueOnce('OO2');

            const actual = game.begin('CC', false);
            expect(actual).toEqual(expected);
        });

        it('should use given answers from predictor (lose)', () => {
            const expected = false;
            game.getRandomAnswerForPredictor = jest.fn().mockReturnValueOnce('CC');

            const actual = game.begin('CC2');
            expect(actual).toEqual(expected);
        });

        it('should use given answers from predictor (win)', () => {
            const expected = true;
            game.getRandomAnswerForPredictor = jest.fn().mockReturnValueOnce('OO');

            const actual = game.begin('CC2');
            expect(actual).toEqual(expected);
        });
    });

    describe('decide()', () => {
        it('should return status saying that someone win (true)', () => {
            const expected = true;

            const actual = game.decide('CO', 'CO2');
            expect(actual).toEqual(expected);
        });

        it('should return status saying that noone win (false)', () => {
            const expected = false;

            const actual = game.decide('CO', 'CO1');
            expect(actual).toEqual(expected);
        });
    });

    describe('getRandomAnswerForPredictor()', () => {
        it('should return answer with no prediction', () => {
            const actual = game.getRandomAnswerForPredictor(true);
            const [left, right] = actual.split('');
            expect(expectedChoices).toContain(left);
            expect(expectedChoices).toContain(right);
        });

        it('should return answer with prediction that is not more than 2', () => {
            game.getRandomHands = jest.fn().mockReturnValueOnce('CC');

            const actual = game.getRandomAnswerForPredictor(false);
            const [left, right, prediction] = actual.split('');
            expect('C').toContain(left);
            expect('C').toContain(right);
            expect([1, 2]).toContain(parseInt(prediction, 10));
        });

        it('should return answer with prediction that is not more than 3', () => {
            game.getRandomHands = jest.fn().mockReturnValueOnce('OC');

            const actual = game.getRandomAnswerForPredictor(false);
            const [left, right, prediction] = actual.split('');
            expect('O').toContain(left);
            expect('C').toContain(right);
            expect([1, 2, 3]).toContain(parseInt(prediction, 10));
        });

        it('should return answer with prediction that is not more than 4', () => {
            game.getRandomHands = jest.fn().mockReturnValueOnce('OO');

            const actual = game.getRandomAnswerForPredictor(false);
            const [left, right, prediction] = actual.split('');
            expect('O').toContain(left);
            expect('O').toContain(right);
            expect(expectedPrediction).toContain(parseInt(prediction, 10));
        });
    });

    describe('getRandomHands()', () => {
        it('should return 2 characters that are either O or C for each character', () => {
            const actual = game.getRandomHands();
            const [left, right] = actual.split('');
            expect(expectedChoices).toContain(left);
            expect(expectedChoices).toContain(right);
        });
    });

    describe('getRandomPrediction()', () => {
        it('should return random open hands in corret range with default value (1 - 4)', () => {
            const actual = game.getRandomNumber();
            expect(expectedPrediction).toContain(actual);
        });

        it('should return random open hands in range of 0 - 1', () => {
            const expected = [0, 1];

            const actual = game.getRandomNumber(0, 1);
            expect(expected).toContain(actual);
        });

        it('should return random open hands in range of 1 - 2', () => {
            const expected = [1, 2];

            const actual = game.getRandomNumber(1, 2);
            expect(expected).toContain(actual);
        });

        it('should return random open hands in range of 1 - 3', () => {
            const expected = [1, 2, 3];

            const actual = game.getRandomNumber(1, 3);
            expect(expected).toContain(actual);
        });
    });
});
