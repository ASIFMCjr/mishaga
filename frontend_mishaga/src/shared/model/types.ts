export interface Message {
    id: number;
    text: string;
    userId: number;
    userName: string;
    createdAt: Date | string;
    room: string;
}