import { Field, InputType } from "@nestjs/graphql";
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
} from "class-validator";
import { UsersRoleType } from "../enum/users.role.type";

@InputType("EditUserInput")
export class EditUserInput {
  @Field({ nullable: true })
  @IsOptional()
  id?: number;

  @Field({ nullable: true })
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  lastName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  username: string;

  @Field({ nullable: true })
  @IsOptional()
  role?: UsersRoleType;

  @Field({ nullable: true })
  @IsOptional()
  password: string;
}
