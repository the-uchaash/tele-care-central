import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  Put,
} from "@nestjs/common";
import { PatientService } from "./patient.service";
import { Patient_ProfileDTO, PatientDTO } from "./patient.dto";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "./auth/auth.guard";

@Controller("api/patient")
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly jwtService: JwtService,
  ) {
    // Empty Constructor
  }

  @Get("/index")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  getIndex(): any {
    return "Relax! Patient is Alive.";
  }
  @Get("/patient_service")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  getService(): any {
    return this.patientService.get_service();
  }

  //   ################################################################# FEATURES ################################################################

  //   #1
  @Post("/signup/patient_details")
  @UsePipes(new ValidationPipe())
  async Patient_Details_Create(@Body() patient_info: PatientDTO): Promise<any> {
    try {
      const saved_patient =
        await this.patientService.Create_Patient(patient_info);
      if (saved_patient > 0) {
        return saved_patient;
      } else {
        throw new InternalServerErrorException(
          "Patient data could not be saved",
        );
      }
    } catch (e) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      });
    }
  }

  //   #2

  @Get("/profile")
  @UseGuards(AuthGuard)
  async View_own_Profile(@Request() req): Promise<any> {
    return await this.patientService.Find_Patient_By_Email(req.user.email);
  }

  @Put("/profile/update")
  @UseGuards(AuthGuard)
  async Update_own_Profile(
    @Request() req,
    @Body() updated_data: Patient_ProfileDTO,
  ): Promise<any> {
    return await this.patientService.Update_Own_Profile_Details(
      req.user.email,
      updated_data,
    );
  }
}
