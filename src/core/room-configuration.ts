// The rules of a room on the server.
export class RoomConfiguration
{
    categoryId: number;   // null if no category
    difficulty: string;   // null if no set difficulty

    constructor(categoryId: number = null, difficulty: string = null)
    {
        this.categoryId = categoryId;
        this.difficulty = difficulty;
    }
}