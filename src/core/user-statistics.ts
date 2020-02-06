/*
    Represents the statistics of a given user in a Trivia Room.
    It is populated by the 'set user stats' event from the
    server.
*/
export class UserStatistics
{
    nickname           : string;
    points             : number;
    pointsChange       : number; // the change in points from the last round
    questionsRight     : number;
    questionsWrong     : number;
    selectedAnswerIndex: number;
}