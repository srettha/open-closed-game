export interface IGame {
    begin(playerAnswer: string, predictor?: boolean): boolean;
    decide(playerAnswer: string, predictorAnswer: string): boolean;
    getRandomAnswer(predictor: boolean): string;
    getRandomHands(): string;
    getRandomPrediction(): number;
}
