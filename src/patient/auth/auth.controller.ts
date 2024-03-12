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
} from "@nestjs/common";
import { AuthService } from "./auth.service";
// import { FileInterceptor } from "@nestjs/platform-express";
// import { MulterError, diskStorage } from "multer";
import * as bcrypt from "bcrypt";
import { LoginDTO } from "../patient.dto";
@Controller("api/patient/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post("register")
  // @UseInterceptors(
  //   FileInterceptor("myfile", {
  //     fileFilter: (req, file, cb) => {
  //       if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
  //         cb(null, true);
  //       else {
  //         cb(new MulterError("LIMIT_UNEXPECTED_FILE", "image"), false);
  //       }
  //     },
  //     limits: { fileSize: 30000 },
  //     storage: diskStorage({
  //       destination: "./upload",
  //       filename: function (req, file, cb) {
  //         cb(null, Date.now() + file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // @UsePipes(new ValidationPipe())
  // async addUser(
  //   @Body() myobj: LoginDTO,
  //   // @UploadedFile() myfile: Express.Multer.File,
  // ): Promise<LoginDTO> {
  //   const salt = await bcrypt.genSalt();
  //   const hashedpassword = await bcrypt.hash(myobj.password, salt);
  //   myobj.password = hashedpassword;
  //   // myobj.filename = myfile.filename;
  //   return this.authService.signUp(myobj);
  // }
  // @Post("login")
  // signIn(@Body() logindata: LoginDTO) {
  //   return this.authService.signIn(logindata);
  // }

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
}
