// The rules of a room on the server.
export class RoomConfiguration
{
    categoryId      : number;   // null if no category
    difficulty      : string;   // null if no set difficulty
    maxSeconds      : number;
    canSkipQuestions: boolean;
    questionCount   : number;

    constructor(categoryId: number = null, difficulty: string = null, maxSeconds: number = 0, canSkipQuestions: boolean = false, questionCount: number = 0)
    {
        this.categoryId       = categoryId;
        this.difficulty       = difficulty;
        this.maxSeconds       = maxSeconds;
        this.canSkipQuestions = canSkipQuestions;
        this.questionCount    = questionCount;
    }
}