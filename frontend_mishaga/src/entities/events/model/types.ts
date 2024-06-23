export interface MyEvent {
    id: number;
    name: string;
    description: string;
    date: string | Date;
    count?: number | string;
    ready: number | string;
    eventImage?: string;
}

export interface MyEventWithUser extends MyEvent {
    users?: {
        id: number;
        eventId: number;
        userId: number;
    }[]
}

export interface CreateEvent extends Omit<MyEvent, 'id'> {}

export interface UpdateEvent extends Partial<CreateEvent> {}