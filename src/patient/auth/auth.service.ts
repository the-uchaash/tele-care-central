import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";
import { PatientService } from "../patient.service";
import { LoginDTO } from "../patient.dto";

@Injectable()
export class AuthService {
  constructor(
    private patientService: PatientService,
    private jwtService: JwtService,
  ) {}
  async signUp(myobj: LoginDTO): Promise<any> {
    return await this.patientService.Create_Signup(myobj);
  }
  async signIn(logindata: LoginDTO): Promise<{ access_token: string }> {
    const user = await this.patientService.Login(logindata);
    if (!user) {
      throw new UnauthorizedException("Email is incorrect");
    }
    if (!(await bcrypt.compare(logindata.password, user.password))) {
      throw new UnauthorizedException("Password is incorrect");
    }
    const payload = logindata;
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
