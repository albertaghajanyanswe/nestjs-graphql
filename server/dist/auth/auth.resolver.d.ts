import { AuthLogin } from "./input/auth.login.input";
import { UsersDTO } from "../users/dto/users.dto";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
export declare class AuthResolver {
    private usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    login(authLogin: AuthLogin): Promise<{
        token: string;
        user: UsersDTO;
    }>;
    defaultLogin(authLogin: AuthLogin): Promise<{
        token: string;
        user: UsersDTO;
    }>;
}
