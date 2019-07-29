import { IGame } from '../typings/game';

class Game implements IGame {
    private readonly choices: string[] = ['O', 'C'];
    private readonly correctChoice: string = 'O';
    private readonly numberOfPlayer: number = 2;
    private readonly random: number = this.choices.length + this.numberOfPlayer;

    /**
     * Begin game by sending answer along with predictor status
     * @public
     * @param {string} answer - answer could be player or predictor
     * @param {boolean} predictor - predictor indicator
     * @returns {boolean} status whether someone win or not
     */
    public begin(answer: string, predictor: boolean = true): boolean {
        const randomAnswer = this.getRandomAnswerForPredictor(predictor);
        console.log('AI:', randomAnswer);
        if (predictor) {
            return this.decide(randomAnswer, answer);
        }

        return this.decide(answer, randomAnswer);
    }

    /**
     * Decide whether someone win from this round or not
     * @public
     * @param {string} playerAnswer - player answer should contain only hands
     * @param {string} predictorAnswer - predictor answer should contain hands and prediction
     * @returns {boolean} status whether someone win or not
     */
    public decide(playerAnswer: string, predictorAnswer: string): boolean {
        let actual = 0;
        const prediction = parseInt(predictorAnswer.slice(2, 3), 10);
        playerAnswer.split('')
            .concat(predictorAnswer.slice(0, 2).split(''))
            .forEach((char) => {
                if (char !== this.correctChoice) {
                    return;
                }

                actual += 1;
            });

        if (actual !== prediction) {
            return false;
        }

        return true;
    }

    /**
     * Get random answer for predictor based on given boolean.
     * If given boolean is true; result will be only hands.
     * If given boolean is false; result will be hands and prediction
     * REMARK: Function takes random hands into account when calculate
     * prediction. So if random hands contain 1 opened-hand. Prediction
     * value will be in range of 1 - 3.
     * @public
     * @param {boolean} predictor - predictor indicator
     * @returns {string} random answer either for player or predictor
     */
    public getRandomAnswerForPredictor(predictor: boolean): string {
        if (predictor) {
            return this.getRandomHands();
        }

        let count = 0;
        const hands = this.getRandomHands();
        hands.split('').forEach((hand) => {
            if (hand !== this.correctChoice) {
                return;
            }

            count += 1;
        });

        return `${hands}${this.getRandomNumber(count === 0 ? 1 : count, count + hands.split('').length)}`;
    }

    /**
     * Get random hands which could only be either 'O' or 'C'
     * @public
     * @returns {string} string contains both hands
     */
    public getRandomHands(): string {
        const left = this.choices[this.getRandomNumber(0, this.choices.length - 1)];
        const right = this.choices[this.getRandomNumber(0, this.choices.length - 1)];

        return `${left}${right}`;
    }

    /**
     * Get random number with given min and max;
     * By default min = 1, max = this.random (4)
     * @public
     * @param {number=} min - minimum number
     * @param {number=} max - maximum number
     * @returns {number} number in range of min and max
     */
    public getRandomNumber(min: number = 1, max: number = this.random): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default Game;
