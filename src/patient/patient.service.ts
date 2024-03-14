import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
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
import { MoreThanOrEqual, Repository } from "typeorm";
// import { MailerService } from "@nestjs-modules/mailer";
import {
  AppointmentDTO,
  BillingDTO,
  FeedbackDTO,
  LoginDTO,
  Patient_ProfileDTO,
  PatientDTO,
} from "./patient.dto";
import { MapperService } from "./mapper.service";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

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

  async Create_an_Appointment(
    email: string,
    appointment_data: AppointmentDTO,
  ): Promise<any> {
    const user = await this.userRepository.findOneBy({
      email: email,
    });
    const appointment_entity = this.mapperService.dtoToEntity(
      appointment_data,
      AppointmentEntity,
    );
    appointment_entity.status = "Pending";
    appointment_entity.patient = user;

    const saved_appointment =
      await this.appointmentRepository.save(appointment_entity);
    return saved_appointment ? saved_appointment.id : -1;
  }

  async Get_Single_Appointment(email: string): Promise<any> {
    // const user = await this.userRepository.findOneBy({
    //   email: email,
    // });

    // Get the current date
    const currentDate = new Date();

    // Extract day, month, and year from the current date
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed
    const currentYear = currentDate.getFullYear();

    // Format the current date in DD/MM/YYYY format
    const formattedCurrentDate = `${currentDay}/${currentMonth}/${currentYear}`;

    // Query the database for the upcoming appointment
    const upcomingAppointment = await this.appointmentRepository.findOne({
      where: {
        appointment_date: MoreThanOrEqual(formattedCurrentDate),
        patient: { email: email },
      },
      order: {
        appointment_date: "ASC", // Get the earliest upcoming appointment
      },
    });

    return upcomingAppointment ? upcomingAppointment : null;
  }

  async Update_Appointment_Details(updated_data: AppointmentDTO): Promise<any> {
    try {
      const previous_data = await this.appointmentRepository.findOneBy({
        id: updated_data.id,
      });

      //  If Date got updated
      if (
        updated_data.appointment_date != previous_data.appointment_date &&
        updated_data.appointment_date != null &&
        updated_data.appointment_date != ""
      ) {
        await this.appointmentRepository.update(previous_data.id, {
          appointment_date: updated_data.appointment_date,
        });
      }

      //   If Time Got updated
      if (
        updated_data.appointment_time != previous_data.appointment_time &&
        updated_data.appointment_time != null &&
        updated_data.appointment_time != ""
      ) {
        await this.appointmentRepository.update(previous_data.id, {
          appointment_time: updated_data.appointment_time,
        });
      }
      return updated_data;
    } catch (e) {
      return new InternalServerErrorException(e.message);
    }
  }

  async Delete_Appointment(id: number): Promise<any> {
    return await this.appointmentRepository.delete(id);
  }

  async Get_All_Medical_Lab_Record_List(
    email: string,
  ): Promise<MedicalLabRecordEntity[]> {
    const user = await this.userRepository.findOneBy({ email: email });
    return this.medicalLabRecordRepository.findBy({ user: user });
  }

  async Get_Single_Medical_Record(id: number): Promise<MedicalLabRecordEntity> {
    try {
      const medical_report = await this.medicalLabRecordRepository.findOneBy({
        id: id,
      });

      if (medical_report != null) {
        return medical_report;
      } else {
        throw new NotFoundException("Data Not Found");
      }
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  // Not Needed, Handled from Controller
  async Update_Profile_Picture(
    email: string,
    image: string,
  ): Promise<Patient_ProfileDTO> {
    const current_user = await this.userRepository.findOneBy({ email: email });
    const current_patient = await this.patientRepository.findOneBy({
      user: current_user,
    });

    if (current_patient) {
      (await current_patient).image = image;
      await this.patientRepository.update((await current_patient).id, {
        image: image,
      });
    }

    return await this.Find_Patient_By_Email(email);
  }

  // Not Needed, Handled from Controller
  async Get_Profile_Picture(email: string, res: any): Promise<any> {
    const current_user = await this.userRepository.findOneBy({ email: email });
    const current_patient = await this.patientRepository.findOneBy({
      user: current_user,
    });
    // console.log("Current seller Image Getting = "+(await current_seller).Profile_Picture) // Working
    if (current_patient) {
      res.sendFile((await current_patient).image, {
        root: "./assets/profile_images",
      });
    } else {
      throw new NotFoundException("Patient data not found");
    }
  }

  async Create_Billing_Payment(
    email: string,
    billing: BillingDTO,
  ): Promise<any> {
    const user = await this.userRepository.findOneBy({ email: email });
    const billEntitiy = await this.mapperService.dtoToEntity(
      billing,
      BillingEntity,
    );

    billEntitiy.user = user;

    const saved_data = await this.userRepository.save(billEntitiy);
    return saved_data ? saved_data.id : -1;
  }

  async Get_All_Billing_Payment(email: string): Promise<BillingEntity[]> {
    const user = await this.userRepository.findOneBy({ email: email });
    return this.billingRepository.findBy({ user: user });
  }

  async Create_Feedback(email: string, feedback: FeedbackDTO): Promise<any> {
    const user = await this.userRepository.findOneBy({ email: email });
    const feedbackEntity = await this.mapperService.dtoToEntity(
      feedback,
      FeedbackEntity,
    );

    feedbackEntity.user = user;

    const saved_data = await this.userRepository.save(feedbackEntity);
    return saved_data ? saved_data.id : -1;
  }

  async Update_Password(): Promise<any> {
    return true;
  }

  async Otp_by_Email(): Promise<any> {
    return true;
  }

  async Login(login_info: LoginDTO): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneBy({
        email: login_info.email,
      });
      if (user != null) {
        return user;
      } else {
        throw new NotFoundException("There is no user using this email");
      }
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  //   Additional Services || Not Features
  async addToBlacklist(
    token: string,
    date_time: string,
    email: string,
  ): Promise<any> {
    try {
      const user = await this.userRepository.findOneBy({ email: email });
      const session = new SessionEntity();
      session.jwt_token = token;
      session.expiration_date = date_time;
      session.user = user;
      const saved_data = await this.sessionRepository.save(session);
      return saved_data.id > 0;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async get_token_by_token(token: string): Promise<SessionEntity> {
    try {
      return await this.sessionRepository.findOneBy({ jwt_token: token });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async Generate_OTP(): Promise<any> {
    return "123456";
  }
}
