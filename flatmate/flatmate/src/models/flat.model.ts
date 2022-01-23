export interface FlatInfo {
    id: string;
    name: string;
}

export interface Flat extends FlatInfo {
    users: UserInfo[];
}

export enum UserRole {
    ADMIN="ADMIN",
    OWNER="OWNER",
    USER="USER"
}