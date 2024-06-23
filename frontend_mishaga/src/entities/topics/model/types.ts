export interface Topic {
    id: number;
    name: string;
    updatedAt?: string | Date;
    category: 'Основная' | 'Знакомства' | 'Учеба';
    room?: string;
    usersCount: number;
    users: {id: number; fio: string}[];
    messagesCount: number;
}
export interface CreateTopic extends Pick<Topic, 'name' | 'category'> {}

export interface TopicFilters {
    category: string;
    search: string;
    sort: string;
    filters: {
        price_gte: number;
        price_lte: number;
    };
}