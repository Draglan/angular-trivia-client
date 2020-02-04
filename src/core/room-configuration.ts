// The rules of a room on the server.
export class RoomConfiguration
{
    category: number;   // -1 if no category
    difficulty: string; // '' if no set difficulty

    constructor(category: number = -1, difficulty: string = '')
    {
        this.category   = category;
        this.difficulty = difficulty;
    }
}