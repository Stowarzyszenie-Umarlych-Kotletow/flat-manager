export class UserService {

    constructor(url) {
        this.url = url; // ex. http://localhost:8080
    }

    createUser = (newUser) => {
        return fetch(this.url + "/api/v1/users", {
            method: "POST",
            headers: this.getBasicHeader(),
            body: JSON.stringify(newUser)
        });
    }

    updateUserPassword = (updatePasswordDTO) => {
        return fetch(this.url + `/api/v1/users/${updatePasswordDTO.id}/password`, {
            method: "PATCH",
            headers: this.getBasicHeader(),
            body: JSON.stringify(updatePasswordDTO)
        });
    }

    updateUserEmail = (updateEmailDTO) => {
        return fetch(this.url + `/api/v1/users/${updateEmailDTO.id}/email`, {
            method: "PATCH",
            headers: this.getBasicHeader(),
            body: JSON.stringify(updateEmailDTO)
        });
    }

    authUser = (authUserDto) => {
        return fetch(this.url + `/api/v1/users/auth`, {
            method: "POST",
            headers: this.getBasicHeader(),
            body: JSON.stringify(authUserDto)
        });
    }

    getUserById = (id) => {
        return fetch(this.url + `/api/v1/users/${id}`, {
            method: "GET",
            headers: this.getBasicHeader()
        });
    }

    deleteUserById = (id) => {
        return fetch(this.url + `/api/v1/users/${updatePasswordDTO.id}`, {
            method: "DELETE",
            headers: this.getBasicHeader()
        });
    }

    getBasicHeader = () => {
        return {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    }



}