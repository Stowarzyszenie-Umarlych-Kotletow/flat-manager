import client from "../helpers/authorized-api-client"

export class AccountService {
    changePassword = (body: ChangePasswordRequest) => client.patch(`/account/password`, body);
    changeEmail = (body: ChangeEmailRequest) => client.patch(`/account/email`, body);
    deleteAccount = (body: DeleteAccountRequest) => client.post(`/account/delete`, body);

};

export default new AccountService();