import client from "../helpers/authorized-api-client"

export class UserService {
    getUsers = () => client.get<User[]>(`/users`);
    getUserById = (userId: string) => client.get<User>(`/users/${userId}`);

};

export default new UserService();