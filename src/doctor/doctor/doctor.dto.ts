import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    Min,
    MinLength,
  } from "class-validator";

  import { ApiProperty } from '@nestjs/swagger';




// export class DoctorDTO 
// {
//     @IsNotEmpty({ message: 'Name must not be empty' })
//     @IsString({ message: 'Name must be a string' })
//     name: string;

//     @IsNotEmpty({ message: 'Specialization must not be empty' })
//     @IsString({ message: 'Specialization must be a string' })
//     specialization: string;

//     @IsNotEmpty({ message: 'Degree must not be empty' })
//     @IsString({ message: 'Degree must be a string' })
//     degree: string;

//     @IsNotEmpty({ message: 'Experience must not be empty' })
//     @IsString({ message: 'Experience must be a string' })
//     experience: string;

//     @IsNotEmpty({ message: 'Email must not be empty' })
//     @IsEmail({}, { message: 'Invalid email format' })
//     email: string;

//     @IsNotEmpty({ message: 'Phone number must not be empty' })
//     @IsString({ message: 'Phone number must be a string' })
//     phoneNumber: string;

//     @IsNotEmpty({ message: 'Image must not be empty' })
//     // @IsString({ message: 'Image must be a string' })
//     image: any;

//     @IsNotEmpty({ message: 'Image must not be empty' })
//     // @IsString({ message: 'Image must be a string' })
//     userId: number;
// }

export class DoctorDTO {
  @IsNotEmpty({ message: 'Name must not be empty' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Specialization must not be empty' })
  @IsString({ message: 'Specialization must be a string' })
  specialization: string;

  @IsNotEmpty({ message: 'Degree must not be empty' })
  @IsString({ message: 'Degree must be a string' })
  degree: string;

  @IsNotEmpty({ message: 'Experience must not be empty' })
  @IsString({ message: 'Experience must be a string' })
  experience: string;

  @IsNotEmpty({ message: 'Email must not be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Phone number must not be empty' })
  @IsString({ message: 'Phone number must be a string' })
  phoneNumber: string;

  // No need for validation decorators for image and userId
  image: any;
  

  @ApiProperty()
  @IsNotEmpty({ message: 'User Id must not be empty' })
  userId: number;
  

}


export class PatientDTO {
    @IsNotEmpty({ message: "Id cannot be empty or null" })
    id: number;
    // Name
    @IsNotEmpty({ message: "Name cannot be empty or null" })
    @IsString({ message: "Name should be a string" })
    @MinLength(3, { message: "Name should be at least 3 characters long" })
    @MaxLength(50, {
      message: "Name should not be more than 50 characters long",
    })
    name: string;
  
    // Age
    @IsNotEmpty({ message: "Age cannot be empty or null" })
    @Min(1, { message: "Minimum age must be at least 1 year" })
    age: number;
  
    // Address
    @IsString({ message: "Address should be a string" })
    @MinLength(3, { message: "Address should be at least 3 characters long" })
    @MaxLength(30, {
      message: "Address should not be more than 30 characters long",
    })
    address: string;
  
    // Gender
    @IsNotEmpty({ message: "Gender cannot be empty or null" })
    gender: string;
  
    // Phone
    @IsNotEmpty({ message: "ISBN number cannot be empty or null" })
    @MinLength(6, {
      message: "ISBN number should be at least 6 characters long",
    })
    @MaxLength(14, {
      message: "ISBN number should not be more than 14 characters long",
    })
    phone: string;
  
    // Image
    @IsString({ message: "Profile Image Name should be a string" })
    image: string;
  
    // User ID
    @IsNotEmpty({ message: "User id cannot be empty or null" })
    @Min(1, { message: "User id must be at least 1" })
    user_id: number;
  }

  export class UserDTO {
    @IsNotEmpty({ message: "Email cannot be empty or null" })
    @IsEmail({}, { message: "Please enter a valid email address" })
    @MaxLength(100, {
      message: "Email should not be more than 100 characters long",
    })
    email: string;
  
    @IsNotEmpty({ message: "Password cannot be empty or null" })
    @Matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/,
      {
        message:
          "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character, and is at least 8 characters long.",
      }
    )
    password: string;
  
    @IsNotEmpty({ message: "Role cannot be empty or null" })
    role: string;
  }

  
  
  // export class LoginDTO {
  //   // Email
  //   @IsNotEmpty({ message: "Email cannot be empty or null" })
  //   @IsEmail({}, { message: "Please enter a valid email address" })
  //   @MaxLength(100, {
  //     message: "Email should not be more than 100 characters long",
  //   })
  //   email: string;
  
  //   // Password
  //   @IsNotEmpty({ message: "Password cannot be empty or null" })
  //   @IsString({ message: "Password should be a string" })
  //   @Matches(
  //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/,
  //     {
  //       message:
  //         "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character, and is at least 8 characters long.",
  //     },
  //   )
  //   password: string;
  // }

  export class payloadDTO {
    // id: number;
    // Email
    id: number;
    email: string;
  
  }

  export class LoginDTO {
    // id: number;
    // Email
    @IsNotEmpty({ message: 'Email cannot be empty or null' })
    @IsEmail({}, { message: 'Please enter a valid email address' })
    email: string;
  
    // Password
    @IsNotEmpty({ message: 'Password cannot be empty or null' })
    @IsString({ message: 'Password should be a string' })
    password: string;
  }
  
  export class Patient_ProfileDTO {
    @IsNotEmpty({ message: "Id cannot be empty or null" })
    id: number;
    // Name
    @IsNotEmpty({ message: "Name cannot be empty or null" })
    @IsString({ message: "Name should be a string" })
    @MinLength(3, { message: "Name should be at least 3 characters long" })
    @MaxLength(50, {
      message: "Name should not be more than 50 characters long",
    })
    name: string;
  
    // Email
    @IsNotEmpty({ message: "Email cannot be empty or null" })
    @IsEmail({}, { message: "Please enter a valid email address" })
    @MaxLength(100, {
      message: "Email should not be more than 100 characters long",
    })
    email: string;
  
    // // Password
    // @IsNotEmpty({ message: "Password cannot be empty or null" })
    // @IsString({ message: "Password should be a string" })
    // @Matches(
    //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/,
    //   {
    //     message:
    //       "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character, and is at least 8 characters long.",
    //   },
    // )
    // password: string;
  
    // Age
    @IsNotEmpty({ message: "Age cannot be empty or null" })
    @Min(1, { message: "Minimum age must be at least 1 year" })
    age: number;
  
    // Address
    @IsString({ message: "Address should be a string" })
    @MinLength(3, { message: "Address should be at least 3 characters long" })
    @MaxLength(30, {
      message: "Address should not be more than 30 characters long",
    })
    address: string;
  
    // Gender
    @IsNotEmpty({ message: "Gender cannot be empty or null" })
    gender: string;
  
    // Phone
    @IsNotEmpty({ message: "ISBN number cannot be empty or null" })
    @MinLength(6, {
      message: "ISBN number should be at least 6 characters long",
    })
    @MaxLength(14, {
      message: "ISBN number should not be more than 14 characters long",
    })
    phone: string;
  
    // Image
    @IsString({ message: "Profile Image Name should be a string" })
    image: string;
  
  
  }
  
  export class AppointmentDTO 
  {
    // Id
    @IsNotEmpty({ message: "ID cannot be empty or null" })
    id: number;
  
    // Appointment Date
    @IsNotEmpty({ message: "Appointment Date cannot be empty or null" })
    appointment_date: string;
  
    // Appointment Time
    @IsNotEmpty({ message: "Appointment Time cannot be empty or null" })
    appointment_time: string;
  
    // Status
    @IsNotEmpty({ message: "Status cannot be empty or null" })
    status: string;
  
    // Patient id
    @IsNotEmpty({ message: "Patient id cannot be empty or null" })
    patient_id: number;

    // Patient id
    @IsNotEmpty({ message: "Patient id cannot be empty or null" })
    doctor: number;

    // Disease (nullable)
    disease: string | null;

    // Response Time (nullable)
    responseTime: string | null;


    scheduledTime: string | null;

  }

  export class eServiceDTO {
    @IsOptional()
    requestDate: string;
  
    @IsOptional()
    disease: string;
  
    @IsOptional()
    description: string;
  
    @IsOptional()
    responseTime: string;
  
    @IsOptional()
    doctorDescription: string;
  
    @IsOptional()
    status: string;
  
    @IsNotEmpty()
    patient_id: number;
  
    @IsNotEmpty()
    doctor_id: number;
  }
  
  export class BillingDTO {
    // Id
    @IsNotEmpty({ message: "ID cannot be empty or null" })
    id: number;
  
    // Appointment Date
    @IsNotEmpty({ message: "Payment Amount cannot be empty or null" })
    amount: string;
  
    // Appointment Time
    @IsNotEmpty({ message: "Payment Date cannot be empty or null" })
    payment_date: string;
  
    // Status
    @IsNotEmpty({ message: "Status cannot be empty or null" })
    status: string;
  
    // Patient id
    @IsNotEmpty({ message: "user id cannot be empty or null" })
    user_id: number;
  }
  
  export class FeedbackDTO {
    // Id
    @IsNotEmpty({ message: "ID cannot be empty or null" })
    id: number;
  
    // Appointment Date
    @IsNotEmpty({ message: "Feedback name cannot be empty or null" })
    test_name: string;
  
    // Appointment Time
    @IsNotEmpty({ message: "Feedback text cannot be empty or null" })
    feedback_text: string;
  
    // Status
    @IsNotEmpty({ message: "Status cannot be empty or null" })
    feedback_date: string;
  
    // Patient id
    @IsNotEmpty({ message: "user id cannot be empty or null" })
    user_id: number;
  }
  
  export class ForgetPasswordDTO {
    // Email
    @IsNotEmpty({ message: "Email cannot be empty or null" })
    email: string;
  }
  
  export class OTP_ReceiverDTO {
    // OTP
    @IsNotEmpty({ message: "OTP cannot be empty or null" })
    otp: string;
  }
  
  export class New_PasswordDTO {
    // Password
    @IsNotEmpty({ message: "Password cannot be empty or null" })
    @IsString({ message: "Password should be a string" })
    @Matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/,
      {
        message:
          "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character, and is at least 8 characters long.",
      },
    )
    password: string;
  }
