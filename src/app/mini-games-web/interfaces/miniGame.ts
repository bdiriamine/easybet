export interface MiniGame {
    broken: string;
    category: string;
    categoryMobile: string;
    categoryWeb: string;
    count: number;
    createdAt: Date;
    deleted: number;
    deleted_at: Date
    game_image: string;
    id: number;
    is_bonus: number;
    is_featured: number;
    is_jackpot: number;
    live: boolean
    name: string;
    new: boolean
    provider: string;
    type: number;
    updatedAt: Date;
}