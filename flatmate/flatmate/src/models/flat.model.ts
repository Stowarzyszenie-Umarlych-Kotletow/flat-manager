interface FlatInfo {
    id: string;
    name: string;
}

interface Flat extends FlatInfo {
    users: UserInfo[];
}