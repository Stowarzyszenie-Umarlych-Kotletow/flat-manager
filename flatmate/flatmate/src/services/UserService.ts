export class UserService {

    constructor(public url: string) {
    }

    async createUser(newUser)  { 
        const response = await fetch(this.url + "/api/v1/users", {
            method: "POST",
            headers: this.getBasicHeader(),
            body: JSON.stringify(newUser)
        });
        return await response.json();
    }

    updateUserPassword = async (updatePasswordDTO) => {
        const response = await fetch(this.url + `/api/v1/users/${updatePasswordDTO.id}/password`, {
            method: "PATCH",
            headers: this.getBasicHeader(),
            body: JSON.stringify(updatePasswordDTO)
        });
        return await response.json();
    }

    updateUserEmail = async (updateEmailDTO) => {
        const response = await fetch(this.url + `/api/v1/users/${updateEmailDTO.id}/email`, {
            method: "PATCH",
            headers: this.getBasicHeader(),
            body: JSON.stringify(updateEmailDTO)
        });
        return await response.json();
    }

    authUser = async (authUserDto) => {
        const response = await fetch(this.url + `/api/v1/users/auth`, {
            method: "POST",
            headers: this.getBasicHeader(),
            body: JSON.stringify(authUserDto)
        });
        return await response.json();
    }

    getUserById = async (id) => {
        const response = await fetch(this.url + `/api/v1/users/${id}`, {
            method: "GET",
            headers: this.getBasicHeader()
        });
        return await response.json();
    }

    deleteUserById = async (id) => {
        const response = await fetch(this.url + `/api/v1/users/${id}`, {
            method: "DELETE",
            headers: this.getBasicHeader()
        });
        return await response.json();
    }

    getBasicHeader = () => {
        return {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    }
}