export class TriviaQuestion
{
    question          : string;   // The question.
    answers           : string[]; // The set of possible answers.
    correctAnswerIndex: number;   // Which of the above answers are correct.
    category          : string;   // The category, i.e. Entertainment.
    difficulty        : string;   // The difficulty, i.e. medium or hard.

    constructor
    (
        question          : string, 
        answers           : string[], 
        correctAnswerIndex: number, 
        category          : string,
        difficulty        : string
    )
    {
        this.question           = question;
        this.answers            = answers;
        this.correctAnswerIndex = correctAnswerIndex;
        this.category           = category;
        this.difficulty         = difficulty;
    }
}