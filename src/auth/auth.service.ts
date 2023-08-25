import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { AuthLogin } from "./input/auth.login.input";
import { UsersDTO } from "../users/dto/users.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(authParams: AuthLogin): Promise<UsersDTO> {
    const { email, password } = authParams;
    const user = await this.usersService.checkUser({ email, password });
    return user;
  }

  async generateAuthToken(user: UsersDTO): Promise<string> {
    const payload = { email: user.email, id: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }

  async validateUserLoginPassword(authParams: AuthLogin): Promise<UsersDTO> {
    const user = await this.usersService.findUserByUsername(authParams);
    return user;
  }
}
