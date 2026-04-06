export interface Habit {
    id: number;
    name: string;
    habit_name?: string;
    description?: string | null;
    user_id?: number;
    category_id?: number | null;
    target_days?: string[];
    [key: string]: unknown;
}
