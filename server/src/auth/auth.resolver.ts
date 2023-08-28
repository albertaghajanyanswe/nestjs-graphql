import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthResponseDTO } from "./dto/auth.dto";
import { AuthLogin } from "./input/auth.login.input";
import { UsersDTO } from "../users/dto/users.dto";
import { Inject, forwardRef } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import * as bcrypt from "bcrypt";
import { ErrorService } from "src/utils/error/error.service";
import { ErrorCodes } from "src/utils/error/error.code";

@Resolver()
export class AuthResolver {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => AuthResponseDTO)
  async login(@Args("authLogin") authLogin: AuthLogin) {
    const user: UsersDTO = await this.authService.validateUser(authLogin);
    const token = await this.authService.generateAuthToken(user);
    return {
      token,
      user,
    };
  }

  @Mutation(() => AuthResponseDTO)
  async defaultLogin(@Args("authLogin") authLogin: AuthLogin) {
    const user: UsersDTO = await this.authService.validateUserLoginPassword(
      authLogin,
    );
    const validPassword = await bcrypt.compare(
      authLogin.password,
      user.password,
    );

    if (!validPassword) {
      throw new ErrorService({
        error: ErrorCodes.INCORRECT_CREDENTIALS,
      });
    }
    const token = await this.authService.generateAuthToken(user);
    return {
      token,
      user,
    };
  }
}
