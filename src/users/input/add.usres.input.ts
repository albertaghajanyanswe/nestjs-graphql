import { Field, InputType } from "@nestjs/graphql";
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
} from "class-validator";
import { UsersRoleType } from "../enum/users.role.type";

@InputType("UsersInput")
export class UsersInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  username?: string;

  @Field({ nullable: true })
  role?: UsersRoleType;

  @Field()
  password: string;
}
