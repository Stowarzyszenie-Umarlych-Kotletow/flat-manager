interface UserInfo {
    id: string;
    username: string;
}

interface User extends UserInfo {
    firstName: string;
    lastName: string;
    email: string;
}