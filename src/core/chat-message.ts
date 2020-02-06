export enum MessageType
{
    Message = 1,
    QuestionCorrect,
    QuestionIncorrect,
    QuestionSkipped,
    Log
}

export class ChatMessage
{   
    header: string;
    message: string;
    type: MessageType;

    constructor(header: string, message: string, type: MessageType)
    {
        this.header  = header;
        this.message = message;
        this.type    = type;
    }
}