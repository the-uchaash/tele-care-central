import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
import { Repository } from "typeorm";
// import { MailerService } from "@nestjs-modules/mailer";
import { LoginDTO, Patient_ProfileDTO, PatientDTO } from "./patient.dto";
import { MapperService } from "./mapper.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(PatientEntity)
    private patientRepository: Repository<PatientEntity>,
    @InjectRepository(AppointmentEntity)
    private appointmentRepository: Repository<AppointmentEntity>,
    @InjectRepository(DoctorEntity)
    private doctorRepository: Repository<DoctorEntity>,
    @InjectRepository(MedicalLabRecordEntity)
    private medicalLabRecordRepository: Repository<MedicalLabRecordEntity>,
    @InjectRepository(FeedbackEntity)
    private feedbackRepository: Repository<FeedbackEntity>,
    @InjectRepository(BillingEntity)
    private billingRepository: Repository<BillingEntity>,
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
    @InjectRepository(OtpEntity)
    private otpRepository: Repository<OtpEntity>,

    // private mailerService: MailerService,
    private mapperService: MapperService,
    private jwtService: JwtService,
  ) {}

  get_service(): string {
    return "PatientService is working!";
  }

  // Features = 17
  async Create_Signup(signup_info: LoginDTO): Promise<any> {
    const user = this.mapperService.dtoToEntity(signup_info, UserEntity);
    const previous_data = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (previous_data === null) {
      const saved_user = await this.userRepository.save(user);
      return saved_user.id;
    } else {
      return -1;
    }
  }

  async Create_Patient(patient_info: PatientDTO): Promise<any> {
    const patientEntity = this.mapperService.dtoToEntity(
      patient_info,
      PatientEntity,
    );

    const user = await this.userRepository.findOneBy({
      id: patient_info.user_id,
    });

    patientEntity.user = user;
    patientEntity.image = "temp.jpg";

    const saved_patient = await this.patientRepository.save(patientEntity);
    return saved_patient ? saved_patient.id : -1;
  }

  async Find_Patient_By_Email(email: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ email: email });
    const patient = await this.patientRepository.findOneBy({ user: user });
    //   Convert to Patient Profile
    const patient_Profile_DTO = this.mapperService.entityToDto(
      patient,
      Patient_ProfileDTO,
    );

    patient_Profile_DTO.id = user.id;
    patient_Profile_DTO.email = user.email;
    return patient_Profile_DTO;
  }

  async Update_Own_Profile_Details(
    email: string,
    updated_data: Patient_ProfileDTO,
  ): Promise<any> {
    try {
      const previous_data = await this.Find_Patient_By_Email(email);
      const previous_user = await this.userRepository.findOneBy({
        email: email,
      });
      const previous_patient = await this.patientRepository.findOneBy({
        user: previous_user,
      });
      // If email Got Updated
      if (
        previous_data.email != updated_data.email &&
        updated_data.email != null &&
        updated_data.email != ""
      ) {
        await this.userRepository.update(previous_data.id, {
          email: updated_data.email,
        });
      }

      //   If name Got Updated
      if (
        previous_data.name != updated_data.name &&
        updated_data.name != null &&
        updated_data.name != ""
      ) {
        await this.patientRepository.update(previous_patient.id, {
          name: updated_data.name,
        });
      }

      //   If age Got Updated
      if (
        previous_data.age != updated_data.age &&
        updated_data.age != null &&
        updated_data.age > 0
      ) {
        await this.patientRepository.update(previous_patient.id, {
          age: updated_data.age,
        });
      }

      //   If address Got Updated
      if (
        previous_data.address != updated_data.address &&
        updated_data.address != null &&
        updated_data.address != ""
      ) {
        await this.patientRepository.update(previous_patient.id, {
          address: updated_data.address,
        });
      }

      //   If phone Got Updated
      if (
        previous_data.phone != updated_data.phone &&
        updated_data.phone != null &&
        updated_data.phone != ""
      ) {
        await this.patientRepository.update(previous_patient.id, {
          phone: updated_data.phone,
        });
      }

      //   If gender Got Updated
      if (
        previous_data.gender != updated_data.gender &&
        updated_data.gender != null &&
        updated_data.gender != ""
      ) {
        await this.patientRepository.update(previous_patient.id, {
          gender: updated_data.gender,
        });
      }

      //   If image Got Updated
      if (
        previous_data.image != updated_data.image &&
        updated_data.image != null &&
        updated_data.image != ""
      ) {
        await this.patientRepository.update(previous_patient.id, {
          image: updated_data.image,
        });
      }
      return updated_data;
    } catch (e) {
      return new InternalServerErrorException(e.message);
    }
  }

  async Create_an_Appointment(): Promise<any> {
    return true;
  }

  async Get_Single_Appointment(): Promise<any> {
    return { data: "12/3/2024" };
  }

  async Update_Appointment_Details(): Promise<any> {
    return { data: "18/3/2024" };
  }

  async Get_All_Medical_Lab_Record_List(): Promise<any> {
    return { data: "Normal" };
  }

  async Update_Single_Medical_Lab_Record(): Promise<any> {
    return { data: "Medicines needed" };
  }

  // Not Needed, Handled from Controller
  async Create_Profile_Picture(): Promise<any> {
    return true;
  }

  // Not Needed, Handled from Controller
  async Get_Profile_Picture(): Promise<any> {
    return { data: "test.jpg" };
  }

  async Create_Billing_Payment(): Promise<any> {
    return true;
  }

  async Get_All_Billing_Payment(): Promise<any> {
    return [
      { name: "medicine", amount: "2000" },
      { name: "visit", amount: "1500" },
    ];
  }

  async Create_Feedback(): Promise<any> {
    return { message: "Very Good" };
  }

  async Update_Password(): Promise<any> {
    return true;
  }

  async Otp_by_Email(): Promise<any> {
    return true;
  }

  async Login(login_info: LoginDTO): Promise<UserEntity> {
    return this.userRepository.findOneBy({ email: login_info.email });
  }

  async Logout(): Promise<any> {
    return true;
  }

  //   Additional Services || Not Features
  async IsUser(): Promise<any> {
    return true;
  }

  async Generate_JWT(user_info: UserEntity): Promise<any> {
    // return await this.jwtService.signAsync({ id: user_info.id });
  }

  async Generate_OTP(): Promise<any> {
    return "123456";
  }
}
