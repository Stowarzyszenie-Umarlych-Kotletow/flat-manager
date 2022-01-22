interface FlatInfo {
    id: string;
    name: string;
}

interface Flat extends FlatInfo {
    users: UserInfo[];
}

enum UserRole {
    ADMIN="ADMIN",
    OWNER="OWNER",
    USER="USER"
}