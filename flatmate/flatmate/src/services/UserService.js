export class UserService {

    constructor(url) {
        this.url = url; // ex. http://localhost:8080
    }

    createUser = (newUser) => {
        return fetch(this.url + "/api/v1/users", {
            method: "POST",
            headers: this.getBasicHeader(),
            body: JSON.stringify(newUser)
        }).then((response)=>response.json());
    }

    updateUserPassword = (updatePasswordDTO) => {
        return fetch(this.url + `/api/v1/users/${updatePasswordDTO.id}/password`, {
            method: "PATCH",
            headers: this.getBasicHeader(),
            body: JSON.stringify(updatePasswordDTO)
        }).then((response)=>response.json());
    }

    updateUserEmail = (updateEmailDTO) => {
        return fetch(this.url + `/api/v1/users/${updateEmailDTO.id}/email`, {
            method: "PATCH",
            headers: this.getBasicHeader(),
            body: JSON.stringify(updateEmailDTO)
        }).then((response)=>response.json());
    }

    authUser = (authUserDto) => {
        return fetch(this.url + `/api/v1/users/auth`, {
            method: "POST",
            headers: this.getBasicHeader(),
            body: JSON.stringify(authUserDto)
        }).then((response)=>response.json());
    }

    getUserById = (id) => {
        return fetch(this.url + `/api/v1/users/${id}`, {
            method: "GET",
            headers: this.getBasicHeader()
        }).then((response)=>response.json());
    }

    deleteUserById = (id) => {
        return fetch(this.url + `/api/v1/users/${updatePasswordDTO.id}`, {
            method: "DELETE",
            headers: this.getBasicHeader()
        }).then((response)=>response.json());
    }

    getBasicHeader = () => {
        return {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    }
}