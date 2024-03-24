import { Controller, Post, Body, Get, Request, BadRequestException, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, NewPasswordDTO } from '../pharmacist.dto'; // Corrected import path
import { AuthGuard } from './auth.guard';

@Controller('api/pharmacist/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("/index")
  @HttpCode(HttpStatus.OK)
  getIndex(): string {
    return "Pharmacist Auth Index";
  }

  @Post("/signup")
  @HttpCode(HttpStatus.OK)
  async signup(@Body() credentials: LoginDTO): Promise<any> {
    try {
      return await this.authService.signup(credentials);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get("/logout")
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Request() req): Promise<any> {
    try {
      // Call your AuthService logout method passing the necessary parameters
      return await this.authService.logout(req.user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post("/change_password")
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async changePassword(@Request() req, @Body() newPasswordDTO: NewPasswordDTO): Promise<any> {
    try {
      // Call your AuthService change password method passing the necessary parameters
      return await this.authService.changePassword(req.user, newPasswordDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
