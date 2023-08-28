import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { AuthLogin } from "./input/auth.login.input";
import { UsersDTO } from "../users/dto/users.dto";
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(authParams: AuthLogin): Promise<UsersDTO>;
    generateAuthToken(user: UsersDTO): Promise<string>;
    validateUserLoginPassword(authParams: AuthLogin): Promise<UsersDTO>;
}
