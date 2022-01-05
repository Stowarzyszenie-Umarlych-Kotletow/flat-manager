import client from "../helpers/authorized-api-client"

export class UserService {
    getUsers = () => client.get<User[]>(`/users`);
    getUserById = (userId: string) => client.get<User>(`/users/by/id/${userId}`);
    getUserByUsername = (username: string) => client.get<User>(`/users/by/username/${username}`);

};

export default new UserService();