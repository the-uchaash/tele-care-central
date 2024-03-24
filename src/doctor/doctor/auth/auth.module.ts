import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { jwtConstants } from "./constants";
import { DoctorModule } from "../doctor.module";
import { TokenBlacklistService } from "./token_blacklist.service";

@Module({
  imports: [
    DoctorModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "2d" },
    }),
  ],
  providers: [AuthService, TokenBlacklistService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}