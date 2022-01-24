export interface FlatInfo {
    id: string;
    name: string;
}

export interface Flat extends FlatInfo {
    users: UserInfo[];
}

export interface UserDebt {
    userId: string;
    amount: string;
}

export enum UserRole {
    ADMIN="ADMIN",
    OWNER="OWNER",
    USER="USER"
}