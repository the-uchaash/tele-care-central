import { Module } from "@nestjs/common";
import { DoctorController } from "./doctor.controller";
import { DoctorService } from "./doctor.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MulterModule } from '@nestjs/platform-express';
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
  eServiceEntity
} from "./doctor.entity";
import { MapperService } from "./mapper.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TokenBlacklistService } from "./auth/token_blacklist.service";
import { AuthModule } from "./auth/auth.module";

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
      eServiceEntity
    ]),
    JwtModule.register({
      global: true,
      secret: "mySecretKey123!@#",
      signOptions: { expiresIn: "30m" },
    }),
    MulterModule.register({
      dest: './uploads', // Destination directory for uploaded files
      limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size (5MB)
        files: 5, // Maximum number of files
      },
      fileFilter: (req, file, callback) => {
        // Example file filter to accept only images
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),

  ],
  controllers: [DoctorController],
  providers: [DoctorService, MapperService, JwtService, TokenBlacklistService],
  exports: [DoctorService], // If you don't add this, it will provide an error
})
export class DoctorModule {}