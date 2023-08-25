import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType("AuthLogin")
export class AuthLogin {
  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}
