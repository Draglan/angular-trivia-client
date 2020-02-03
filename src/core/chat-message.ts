export class ChatMessage
{
    nickname: string;
    message: string;

    constructor(nickname: string, message: string)
    {
        this.nickname = nickname;
        this.message = message;
    }
}