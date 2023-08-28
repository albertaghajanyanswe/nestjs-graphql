import { UsersRoleType } from "../enum/users.role.type";
export declare class UsersModel {
    id: number;
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    role: UsersRoleType;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
