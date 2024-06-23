export interface MyAd {
    id: number;
    name: string;
    description: string;
    photos?: string[];
    createdAt?: string | Date;
    contactData: string;
    category: 'seek' | 'found' | 'exchange';
    room?: string;
}
export interface CreateAd extends Omit<MyAd, 'id'> {}
export interface UpdateAd extends Partial<CreateAd> {}