import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Generated,
} from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { IsEnum } from "class-validator";
import { UsersRoleType } from "../enum/users.role.type";

@ObjectType()
@Entity()
export class UsersModel {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Generated("uuid")
  @Column()
  uuid: string;

  @Field({ nullable: true })
  @Column({ length: 500, nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ length: 500, nullable: true })
  lastName: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field()
  @Column("text", { unique: true })
  username: string;

  @Field({ nullable: true })
  @Column({ length: 500, nullable: true })
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsEnum(UsersRoleType)
  role: UsersRoleType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @DeleteDateColumn({ type: "timestamptz" })
  deletedAt: Date;
}
