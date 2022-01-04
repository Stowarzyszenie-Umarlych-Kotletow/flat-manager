import client from "../helpers/api-client"
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../models/api/auth";

export class AuthService {
    login = (body: LoginRequest) => client.post<LoginResponse>(`/auth/login`, body);
    register = (body: RegisterRequest) => client.post<RegisterResponse>(`/auth/register`, body);
};

export default new AuthService();