export class TriviaQuestion
{
    question          : string;   // The question.
    answers           : string[]; // The set of possible answers.
    correctAnswerIndex: number;   // Which of the above answers are correct.
    categoryName      : string;   // The category, i.e. Entertainment.
    difficulty        : string;   // The difficulty, i.e. medium or hard.
    questionNumber    : number;   // In a game, the number of this question.
    questionCount     : number;   // In a game, the total number of questions to be asked. 0 if infinite.

    constructor
    (
        question          : string, 
        answers           : string[], 
        correctAnswerIndex: number, 
        categoryName      : string,
        difficulty        : string
    )
    {
        this.question           = question;
        this.answers            = answers;
        this.correctAnswerIndex = correctAnswerIndex;
        this.categoryName       = categoryName;
        this.difficulty         = difficulty;
    }
}