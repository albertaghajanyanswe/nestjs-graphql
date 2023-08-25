import { IsOptional } from "class-validator";
import { Field, ObjectType } from "@nestjs/graphql";
import { UsersDTO } from "../../users/dto/users.dto";

@ObjectType()
export class AuthResponseDTO {
  @Field({ nullable: true })
  @IsOptional()
  token?: string;

  @Field({ nullable: true })
  @IsOptional()
  user?: UsersDTO;
}
