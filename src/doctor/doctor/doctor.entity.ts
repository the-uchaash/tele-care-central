import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.patient)
  appointments: AppointmentEntity[];

  @OneToMany(() => MedicalLabRecordEntity, (record) => record.user)
  medicalLabRecords: MedicalLabRecordEntity[];

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.user)
  feedbacks: FeedbackEntity[];

  @OneToMany(() => BillingEntity, (billing) => billing.user)
  billings: BillingEntity[];

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];

  @OneToMany(() => OtpEntity, (otp) => otp.user)
  otp: OtpEntity[];

  @OneToMany(() => DoctorEntity, doctor => doctor.user)
  doctors: DoctorEntity[];
}

@Entity("patient")
export class PatientEntity 
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  gender: string;

  @Column()
  image: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}

@Entity("doctor")
export class DoctorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  specialization: string;

  @Column()
  degree: string;

  @Column()
  experience: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  image: string;

  @ManyToOne(() => UserEntity) // Define the user relationship
  @JoinColumn() // Add join column
  user: UserEntity; // Define the user property
  
  @OneToMany(() => eServiceEntity,(eService)=>eService.doctor)
  eServices: eServiceEntity[];
  
}

@Entity("appointment")
export class AppointmentEntity 
{
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // user_id
  // patient_id: number;

  // @Column()
  // user_id
  // doctor_id: number;

  @Column()
  appointment_date: string;

  @Column()
  appointment_time: string;

  @Column({ nullable: true })
  disease: string;

  @Column({ nullable: true }) 
  responseTime: string;

  @Column({ nullable: true }) 
  scheduledTime: string;

  @Column()
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.appointments)
  @JoinColumn({ name: "patient_id" })
  patient: UserEntity;


  // @ManyToOne(() => UserEntity, (user) => user.appointments)
  // @JoinColumn({ name: "doctor_id" })
  // doctor: UserEntity;
  
  @ManyToOne(() => DoctorEntity, (doctor) => doctor.id)
  @JoinColumn({ name: "doctor_id" })
  doctor: DoctorEntity;
}






@Entity("eService")
export class eServiceEntity 
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  requestDate: string;

  @Column({ nullable: true })
  disease: string;

  @Column({ nullable: true }) 
  description: string;

  @Column({ nullable: true }) 
  responseTime: string;

  @Column({ nullable: true }) 
  doctorDescription: string;

  @Column({ nullable: true }) 
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.appointments)
  @JoinColumn({ name: "patient_id" })
  patient: UserEntity;


  @ManyToOne(() => DoctorEntity, (doctor) => doctor.eServices)
  @JoinColumn({ name: "doctor_id" })
  doctor: DoctorEntity;
}



@Entity("medical_lab_record")
export class MedicalLabRecordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // user_id: number;

  @Column()
  test_name: string;

  @Column()
  test_date: string;

  @Column()
  result: string;

  @ManyToOne(() => UserEntity, (user) => user.medicalLabRecords)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}

@Entity("feedback")
export class FeedbackEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // user_id: number;

  @Column()
  test_name: string;

  @Column()
  feedback_text: string;

  @Column()
  feedback_date: string;

  @ManyToOne(() => UserEntity, (user) => user.feedbacks)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}

@Entity("billing")
export class BillingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // user_id: number;

  @Column()
  amount: string;

  @Column()
  payment_date: string;

  @Column()
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.billings)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}

@Entity("session")
export class SessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // user_id: number;

  @Column()
  jwt_token: string;

  @Column()
  expiration_date: string;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}

@Entity("otp")
export class OtpEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  otp: string;

  @Column({ nullable: true })
  expiration_date: string;

  @ManyToOne(() => UserEntity, (user) => user.otp)
  user: UserEntity;
}



