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
            game.getRandomAnswer = jest.fn().mockReturnValueOnce('CC1');

            const actual = game.begin('CC', false);
            expect(actual).toEqual(expected);
        });

        it('should use given answer from player (win)', () => {
            const expected = true;
            game.getRandomAnswer = jest.fn().mockReturnValueOnce('OO2');

            const actual = game.begin('CC', false);
            expect(actual).toEqual(expected);
        });

        it('should use given answers from predictor (lose)', () => {
            const expected = false;
            game.getRandomAnswer = jest.fn().mockReturnValueOnce('CC');

            const actual = game.begin('CC2');
            expect(actual).toEqual(expected);
        });

        it('should use given answers from predictor (win)', () => {
            const expected = true;
            game.getRandomAnswer = jest.fn().mockReturnValueOnce('OO');

            const actual = game.begin('CC2');
            expect(actual).toEqual(expected);
        });
    });

    describe('decide()', () => {
        it('should return message saying that You WIN!!', () => {
            const expected = true;

            const actual = game.decide('CO', 'CO2');
            expect(actual).toEqual(expected);
        });

        it('should return message saying that No winner.', () => {
            const expected = false;

            const actual = game.decide('CO', 'CO1');
            expect(actual).toEqual(expected);
        });
    });

    describe('getRandomAnswer()', () => {
        it('should return answer with prediction if predictor is true', () => {
            const actual = game.getRandomAnswer(true);
            const [left, right, prediction] = actual.split('');
            expect(expectedChoices).toContain(left);
            expect(expectedChoices).toContain(right);
            expect(expectedPrediction).toContain(parseInt(prediction, 10));
        });

        it('should return answer with no prediction if predictor is false', () => {
            const actual = game.getRandomAnswer(false);
            const [left, right] = actual.split('');
            expect(expectedChoices).toContain(left);
            expect(expectedChoices).toContain(right);
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
        it('should return random open hands in corret range', () => {
            const actual = game.getRandomPrediction();
            expect(expectedPrediction).toContain(actual);
        });
    })
});
