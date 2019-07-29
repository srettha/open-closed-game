import { validatePlayerAnswer, validatePredictorAnswer } from '../../../src/lib/validator';

describe('./lib/validator', () => {
    describe('validatePlayerAnswer()', () => {
        it('should return message saying that Bad input: no prediction expected', () => {
            const expected = 'Bad input: no prediction expected, you are not the predictor.';

            const actual = validatePlayerAnswer('CO2');
            expect(actual).toEqual(expected);
        });

        it('should return message saying that Bad input: correct input can only be [O] and [C]', () => {
            const expected =  'Bad input: correct input can only be two letter [O]pen or [C]losed state for each hand';

            const actual = validatePlayerAnswer('co');
            expect(actual).toEqual(expected);
        });

        it('should return true when it passes validation', () => {
            const expected = true;

            const actual = validatePlayerAnswer('CC');
            expect(actual).toEqual(expected);
        });
    });

    describe('validatePredictorAnswer()', () => {
        it('should return message saying that Bad input: correct input should be of the form CC3', () => {
            const expected = 'Bad input: correct input should be of the form CC3,' +
            'where the first two letters indicate [O]pen or [C]losed state for each hand,' +
            'followed by the prediction (0-4).';

            const actual = validatePredictorAnswer('co');
            expect(actual).toEqual(expected);
        });

        it('should return message saying that Bad input: correct input can only be [O] and [C]', () => {
            const expected =  'Bad input: correct input can only be two letter [O]pen or [C]losed state for each hand';

            const actual = validatePredictorAnswer('co2');
            expect(actual).toEqual(expected);
        });

        it('should return message saying that Bad input: prediction should be in range of 0-4', () => {
            const expected =  'Bad input: prediction should be in the range of 0-4.';

            const actual = validatePredictorAnswer('CO5');
            expect(actual).toEqual(expected);
        });

        it('should return true when it passes validation', () => {
            const expected = true;

            const actual = validatePredictorAnswer('CO2');
            expect(actual).toEqual(expected);
        });
    });
});
