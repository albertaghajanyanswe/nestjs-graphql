import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersModel } from "./model/users.model";
import { Not, Repository } from "typeorm";
import { UsersInput } from "./input/add.usres.input";
import { EditUserInput } from "./input/edit.user.input";
import { generateQueryStatement } from "../utils/query.statement";
import { ErrorService } from "../utils/error/error.service";
import { ErrorCodes } from "../utils/error/error.code";
import { UsersRoleType } from "./enum/users.role.type";
import * as bcrypt from "bcrypt";
import { hash, compare } from "../utils/crypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private usersRepository: Repository<UsersModel>,
  ) { }

  async createUser(data: UsersInput): Promise<UsersModel> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);

    const email = await this.usersRepository.findOne({
      where: { email: data.email },
    });
    if (email) {
      throw new ErrorService({
        error: ErrorCodes.EMAIL_ALREADY_IN_USE,
      });
    }
    return this.usersRepository.save({ ...data, password: hashedPassword });
  }

  async saveUser(data: UsersInput): Promise<UsersModel> {
    const email = await this.usersRepository.findOne({
      where: { email: data.email },
    });
    if (email) {
      throw new ErrorService({
        error: ErrorCodes.EMAIL_ALREADY_IN_USE,
      });
    }
    return this.usersRepository.save(data);
  }

  async getAll(): Promise<UsersModel[]> {
    // return this.usersRepository.find({
    //   where: { role: Not(UsersRoleType.SUPER_USER) },
    // });
    return this.usersRepository.find();
  }

  async editUser(data: EditUserInput): Promise<UsersModel> {
    const { id, ...rest } = data;
    return this.usersRepository
      .createQueryBuilder()
      .update(UsersModel)
      .set({ ...rest })
      .where(generateQueryStatement({ id }), { id })
      .returning("*")
      .execute()
      .then((response) => {
        if (response.raw[0]) {
          return response.raw[0];
        }
        throw response;
      })
      .catch((err) => {
        throw new ErrorService({
          error: ErrorCodes.INCORRECT_CREDENTIALS,
        });
      });
  }

  async checkUser(data): Promise<UsersModel> {
    // eslint-disable-next-line prefer-const
    console.log("data = ", data);
    const { email, password } = data;
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new ErrorService({
        error: ErrorCodes.INCORRECT_CREDENTIALS,
      });
    }
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw new ErrorService({
        error: ErrorCodes.INCORRECT_CREDENTIALS,
      });
    }
    return user;
  }

  async findUserByIdAndRole(data): Promise<UsersModel> {
    const { id, role } = data;
    return this.usersRepository.findOne({ where: { id, role } });
  }

  async findUserByUsername(data): Promise<UsersModel> {
    const { email } = data;
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new ErrorService({
        error: ErrorCodes.INCORRECT_CREDENTIALS,
      });
    }
    return user;
  }
}
