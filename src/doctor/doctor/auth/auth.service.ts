import {Injectable,InternalServerErrorException,UnauthorizedException,} from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";
import { DoctorService } from "../doctor.service";
import { LoginDTO, UserDTO, payloadDTO } from "../doctor.dto";
import { Request } from "express";
import { TokenBlacklistService } from "./token_blacklist.service";
import { instanceToPlain } from "class-transformer";

@Injectable()
export class AuthService {
  constructor(
    private doctorService: DoctorService,
    private jwtService: JwtService,
    private tokenBlacklistService: TokenBlacklistService,
  ) {}


  async signUp(myobj: UserDTO): Promise<any> 
  {
    return await this.doctorService.Create_Signup(myobj);
  }
  async signIn(logindata: LoginDTO): Promise<{ access_token: string }> 
  {
    const user = await this.doctorService.Login(logindata);
    if (!user) {
      throw new UnauthorizedException("Email is incorrect");
    }
    if (!(await bcrypt.compare(logindata.password, user.password))) {
      throw new UnauthorizedException("Password is incorrect");
    }

    const payload = new payloadDTO();
    payload.id = user.id;
    payload.email = user.email;
    
    return {
      access_token: await this.jwtService.signAsync(instanceToPlain(payload)),
    };
  }

  async logout(email: string, token: string): Promise<any> 
  {
    try {
      // Blacklist the token
      const decision = await this.tokenBlacklistService.addToBlacklist(
        email,
        token,
      );

      if (decision != null) {
        return decision;
      } else {
        throw new InternalServerErrorException(
          "Problem in Token Blacklist Service",
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async UpdatePassword(req: Request, password: string): Promise<any> 
  {
    try {
      await this.doctorService.Update_Password(req, password);
    } catch (e) {
      throw new InternalServerErrorException(
        "Update Password Auth Service error = " + e.message,
      );
    }
  }

  extractTokenFromHeader(request: Request): string | undefined 
  {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }

  async destroy_temporary_JWT(req: Request): Promise<any> 
  {
    try {
      const token = await this.extractTokenFromHeader(req);

      const user = await this.doctorService.get_user_from_Request(req);

      // Blacklist the token
      const decision = await this.tokenBlacklistService.addToBlacklist(
        user.email,
        token,
      );

      if (decision != null) {
        return decision;
      } else {
        throw new InternalServerErrorException(
          "Problem in Token Blacklist Service",
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  
  getEmailFromToken(token: string): string {
    const decodedToken = this.jwtService.decode(token);
    if (decodedToken && 'email' in decodedToken) {
      return decodedToken['email'];
    }
    throw new Error('Invalid token or missing email field');
  }
}
