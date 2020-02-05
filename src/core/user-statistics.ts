/*
    Represents the statistics of a given user in a Trivia Room.
    It is populated by the 'set user stats' event from the
    server.
*/
export class UserStatistics
{
    nickname      : string;
    points        : number;
    questionsRight: number;
    questionsWrong: number;
}