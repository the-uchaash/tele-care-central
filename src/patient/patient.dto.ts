import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

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

export class LoginDTO {
  // Email
  @IsNotEmpty({ message: "Email cannot be empty or null" })
  @IsEmail({}, { message: "Please enter a valid email address" })
  @MaxLength(100, {
    message: "Email should not be more than 100 characters long",
  })
  email: string;

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

  // User ID
  @IsNotEmpty({ message: "User id cannot be empty or null" })
  @Min(1, { message: "User id must be at least 1" })
  user_id: number;
}
