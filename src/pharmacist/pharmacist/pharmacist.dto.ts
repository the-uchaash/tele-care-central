import { IsNotEmpty, IsString, IsNumber, IsArray, IsDate } from 'class-validator';

// DTOs for Pharmacist Controller

// Feature 1: Pharmacist Authentication
export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

// Feature 2: Prescription Management
export class PrescriptionDTO {
  @IsNotEmpty()
  @IsString()
  medicationName: string;

  @IsNotEmpty()
  @IsNumber()
  dosage: number;

  @IsNotEmpty()
  @IsDate()
  prescriptionDate: Date;

  // Add more fields as needed for prescription management
  @IsNotEmpty()
  @IsString()
  patientName: string;

  @IsNotEmpty()
  @IsString()
  physicianName: string;

  @IsNotEmpty()
  @IsString()
  instructions: string;
}

// Feature 3: Medication Inventory Management
export class MedicationInventoryDTO {
  @IsNotEmpty()
  @IsString()
  medicationName: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  // Add more fields as needed for medication inventory management
  @IsNotEmpty()
  @IsString()
  manufacturer: string;

  @IsNotEmpty()
  @IsString()
  batchNumber: string;

  @IsNotEmpty()
  @IsDate()
  expiryDate: Date;
}

// Feature 4: Medication Alerts
export class MedicationAlertDTO {
  @IsNotEmpty()
  @IsString()
  medicationName: string;

  @IsNotEmpty()
  @IsDate()
  expirationDate: Date;

  // Add more fields as needed for medication alerts
  @IsNotEmpty()
  @IsString()
  alertMessage: string;

  @IsNotEmpty()
  @IsString()
  alertType: string;
}

// Feature 5: Billing and Payments
export class BillingDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  // Add more fields as needed for billing and payments
  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsNotEmpty()
  @IsString()
  transactionId: string;
}

export class NewPasswordDTO {
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}













