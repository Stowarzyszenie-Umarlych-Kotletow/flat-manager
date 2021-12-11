export class UserService {

    constructor(url) {
        this.url = url; // ex. http://localhost:8080
    }

    createUser = (newUser) => {
        fetch(this.url + "/api/v1/users", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
    }

    updateUserPassword = (updatePasswordDTO) => {
        fetch(this.url + `/api/v1/users/${updatePasswordDTO.id}/password`, {
            method: "PATCH",
            headers: {
                Accept: 'application/json',
                "Content-type": 'application/json'
            },
            body: JSON.stringify(updatePasswordDTO)
        });
    }

    updateUserEmail = (updateEmailDTO) => {
        fetch(this.url + `/api/v1/users/${updateEmailDTO.id}/email`, {
            method: "PATCH",
            headers: {
                Accept: 'application/json',
                "Content-type": 'application/json'
            },
            body: JSON.stringify(updateEmailDTO)
        });
    }

    authUser = (authUserDto) => {
        fetch(this.url + `/api/v1/users/auth`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-type": 'application/json'
            },
            body: JSON.stringify(authUserDto)
        });
    }

    getUserById = (id) => {
        fetch(this.url + `/api/v1/users/${id}`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Content-type": 'application/json'
            }
        });
    }

    deleteUserById = (id) => {
        fetch(this.url + `/api/v1/users/${updatePasswordDTO.id}`, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                "Content-type": 'application/json'
            }
        });
    }



}