import client from "../helpers/authorized-api-client"

export class FlatService {
    getFlats = () => client.get<FlatInfo[]>(`/flats`);
    getFlat = (flatId: string) => client.get<FlatInfo>(`/flats/${flatId}`);
    getFlatUsers = (flatId: string) => client.get<UserInfo[]>(`/flats/${flatId}`);
    addUserToFlat = (flatId: string, userId: string) => client.put(`/flats/${flatId}/users`, { userId });
    createFlat = (body: CreateFlatRequest) => client.post<FlatInfo>(`/flats`, body);

};

export default new FlatService();