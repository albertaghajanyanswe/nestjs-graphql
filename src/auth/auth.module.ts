import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { forwardRef, Module } from "@nestjs/common";

import { jwtConstants } from "./constants";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";

import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { UsersModel } from "../users/model/users.model";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersModel]),
    forwardRef(() => UsersModule),
    ConfigModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      //TODO take from config service
      signOptions: { expiresIn: "30d" },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AuthResolver,
    UsersService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
