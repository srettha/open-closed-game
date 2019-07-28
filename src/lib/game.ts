import { IGame } from '../typings/game';

class Game implements IGame {
    private readonly choices: string[] = ['O', 'C'];
    private readonly correctChoice: string = 'O';
    private readonly random: number = 4;

    public begin(answer: string, predictor: boolean = true): boolean {
        const randomAnswer = this.getRandomAnswer(predictor);
        console.log('AI:', randomAnswer);
        if (!predictor) {
            return this.decide(answer, randomAnswer);
        }

        return this.decide(randomAnswer, answer);
    }

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

    public getRandomAnswer(predictor: boolean): string {
        if (predictor) {
            return `${this.getRandomHands()}${this.getRandomPrediction()}`;
        }

        return this.getRandomHands();
    }

    public getRandomHands(): string {
        const left = this.choices[Math.round(Math.random())];
        const right = this.choices[Math.round(Math.random())];

        return `${left}${right}`;
    }

    public getRandomPrediction(): number {
        return Math.floor(Math.random() * (this.random)) + 1;
    }
}

export default Game;
