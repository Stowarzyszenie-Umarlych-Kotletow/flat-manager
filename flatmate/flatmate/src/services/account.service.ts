import client from "../helpers/authorized-api-client";
import {ChangeEmailRequest, ChangePasswordRequest, DeleteAccountRequest} from "../models/api/account";

export class AccountService {
    changePassword = (body: ChangePasswordRequest) => client.post(`/account/password`, body);
    changeEmail = (body: ChangeEmailRequest) => client.post(`/account/email`, body);
    deleteAccount = (body: DeleteAccountRequest) => client.post(`/account/delete`, body);
    getSelf = () => client.get<User>(`/account`);

};

export default new AccountService();