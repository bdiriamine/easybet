export interface Chat {
    content: string;
    createdAt: Date;
    creator_id: string;
    id: string;
    is_seen: boolean
    reciever_id: string;
    room_id: string;
    updatedAt: Date;
}