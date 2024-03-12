import { Module } from "@nestjs/common";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  AppointmentEntity,
  BillingEntity,
  DoctorEntity,
  FeedbackEntity,
  MedicalLabRecordEntity,
  OtpEntity,
  PatientEntity,
  SessionEntity,
  UserEntity,
} from "./patient.entity";
import { MapperService } from "./mapper.service";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PatientEntity,
      AppointmentEntity,
      DoctorEntity,
      MedicalLabRecordEntity,
      FeedbackEntity,
      BillingEntity,
      SessionEntity,
      OtpEntity,
    ]),
    JwtModule.register({
      global: true,
      secret: "3NP_Backend_Admin",
      signOptions: { expiresIn: "30m" },
    }),
  ],
  controllers: [PatientController],
  providers: [PatientService, MapperService, JwtService],
  exports: [PatientService], // If you don't add this, it will provide an error
})
export class PatientModule {}
