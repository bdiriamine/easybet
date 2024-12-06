export interface Deposit {
    amount: number;
    created_at: string;
    history_reciver: string;
    history_sender: string;
    id: number;
    reciver: string;
    reciver_role: string;
    sender: string;
    sender_role: string;
    type: string;
    updated_at: Date;
}