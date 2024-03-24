import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { PharmacistController } from "./pharmacist.controller";
import { PharmacistService } from "./pharmacist.service";
import {
  PharmacistEntity,
  PrescriptionEntity,
  MedicationInventoryEntity,
  MedicationAlertEntity,

} from "./pharmacist.entity";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      PharmacistEntity,
      PrescriptionEntity,
      MedicationInventoryEntity,
      MedicationAlertEntity,
    ]),
    AuthModule,
  ],
  controllers: [PharmacistController],
  providers: [PharmacistService],
})
export class PharmacistModule {}
