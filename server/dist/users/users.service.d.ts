import { UsersModel } from "./model/users.model";
import { Repository } from "typeorm";
import { UsersInput } from "./input/add.usres.input";
import { EditUserInput } from "./input/edit.user.input";
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<UsersModel>);
    createUser(data: UsersInput): Promise<UsersModel>;
    saveUser(data: UsersInput): Promise<UsersModel>;
    getAll(): Promise<UsersModel[]>;
    editUser(data: EditUserInput): Promise<UsersModel>;
    checkUser(data: any): Promise<UsersModel>;
    findUserByIdAndRole(data: any): Promise<UsersModel>;
    findUserByUsername(data: any): Promise<UsersModel>;
}
