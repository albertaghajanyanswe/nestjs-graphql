import { UsersService } from "./users.service";
import { UsersInput } from "./input/add.usres.input";
import { UsersDTO } from "./dto/users.dto";
import { UsersModel } from "./model/users.model";
import { EditUserInput } from "./input/edit.user.input";
export declare class UsersResolver {
    private usersService;
    constructor(usersService: UsersService);
    createUser(data: UsersInput): Promise<UsersDTO>;
    addUser(data: UsersInput, { id, role }: UsersModel): Promise<UsersDTO>;
    editUser(data: EditUserInput, { id, role }: UsersModel): Promise<UsersDTO>;
    fullName({ firstName, lastName }: UsersModel): Promise<string>;
    getAllUsers({ id, role }: UsersModel): Promise<UsersDTO[]>;
}
