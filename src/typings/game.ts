export interface IGame {
    begin(playerAnswer: string, predictor?: boolean): boolean;
    decide(playerAnswer: string, predictorAnswer: string): boolean;
    getRandomAnswerForPredictor(predictor: boolean): string;
    getRandomHands(): string;
    getRandomNumber(min?: number, max?: number): number;
}
