import { Inject, UseGuards } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Query,
} from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { UsersInput } from "./input/add.usres.input";
import { UsersDTO } from "./dto/users.dto";
import { UsersModel } from "./model/users.model";
import { EditUserInput } from "./input/edit.user.input";
import { JwtAuthGuard } from "../auth/guards/jwt.auth.guard";
import { CurrentUser } from "../auth/guards/current.user.guard";
import { UsersRoleType } from "./enum/users.role.type";
import { ErrorService } from "../utils/error/error.service";
import { ErrorCodes } from "../utils/error/error.code";

@Resolver((of) => UsersDTO)
export class UsersResolver {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  @Mutation(() => UsersDTO)
  async createUser(@Args("user") data: UsersInput): Promise<UsersDTO> {
    return this.usersService.createUser(data);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UsersDTO)
  async addUser(
    @Args("user") data: UsersInput,
    @CurrentUser() { id, role }: UsersModel,
  ): Promise<UsersDTO> {
    const user = await this.usersService.findUserByIdAndRole({ id, role });
    if (
      user &&
      (user.role === UsersRoleType.ADMIN ||
        user.role === UsersRoleType.SUPER_USER)
    ) {
      return this.usersService.saveUser(data);
    }
    throw new ErrorService({
      error: ErrorCodes.FORBIDDEN,
    });
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Mutation(() => UsersDTO)
  async editUser(
    @Args("user") data: EditUserInput,
    @CurrentUser() { id, role }: UsersModel
  ): Promise<UsersDTO> {
    const user = await this.usersService.findUserByIdAndRole({ id, role });
    if (
      user &&
      (user.role === UsersRoleType.ADMIN ||
        user.role === UsersRoleType.SUPER_USER)
    ) {
      return this.usersService.editUser(data);
    }
    throw new ErrorService({
      error: ErrorCodes.FORBIDDEN,
    });
  }

  @ResolveField("fullName", () => String, { nullable: true })
  async fullName(
    @Parent() { firstName, lastName }: UsersModel
  ): Promise<string> {
    return `${firstName} ${lastName}`;
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [UsersDTO])
  async getAllUsers(
    @CurrentUser() { id, role }: UsersModel
  ): Promise<UsersDTO[]> {
    const user = await this.usersService.findUserByIdAndRole({ id, role });
    if (user) {
      return this.usersService.getAll();
    }
    throw new ErrorService({
      error: ErrorCodes.FORBIDDEN,
    });
  }
}
