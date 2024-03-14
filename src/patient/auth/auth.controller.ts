import {
  Body,
  Controller,
  Post,
  UsePipes,
  // UseInterceptors,
  // UploadedFile,
  ValidationPipe,
  BadRequestException,
  HttpStatus,
  Get,
  Request,
  InternalServerErrorException,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
// import { FileInterceptor } from "@nestjs/platform-express";
// import { MulterError, diskStorage } from "multer";
import * as bcrypt from "bcrypt";
import { LoginDTO } from "../patient.dto";
import { AuthGuard } from "./auth.guard";
@Controller("api/patient/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("/index")
  // @UseGuards(SessionGuard)
  // @UsePipes(new ValidationPipe())
  getIndex(): any {
    return "Relax! Patient Auth is working.";
  }

  @Post("/signup")
  // @UsePipes(new ValidationPipe())
  async Signup(@Body() signup_info: LoginDTO): Promise<any> {
    try {
      const hashed_pass = await bcrypt.hash(signup_info.password, 12);
      signup_info.password = hashed_pass;

      const user_id = await this.authService.signUp(signup_info);
      if (user_id < 0) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: "Email Already Exists",
        });
      } else {
        return user_id;
      }
    } catch (e) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }

  @Post("/login")
  @UsePipes(new ValidationPipe())
  async Login(@Body() login_info: LoginDTO): Promise<any> {
    return await this.authService.signIn(login_info);
  }

  @Get("/logout")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async Logout(@Request() req): Promise<any> {
    try {
      const token = await this.authService.extractTokenFromHeader(req);
      if (token != null && token != "") {
        return await this.authService.logout(req.user.email, token);
      } else {
        throw new BadRequestException(
          "Please provide the token inside header, along with the request",
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
