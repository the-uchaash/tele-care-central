import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, UseGuards, UsePipes, ValidationPipe, Request, NotFoundException, BadRequestException } from "@nestjs/common";
import { PharmacistService } from "./pharmacist.service";
import { PrescriptionDTO, MedicationInventoryDTO, MedicationAlertDTO, BillingDTO } from "./pharmacist.dto";
import { AuthGuard } from "./auth/auth.guard";
import { HttpCode } from "@nestjs/common"; // Add this line

@Controller("api/pharmacist")
export class PharmacistController {
  constructor(private readonly pharmacistService: PharmacistService) {}

  @Post("/login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: any): Promise<any> {
    try {
      return await this.pharmacistService.login(credentials);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post("/prescriptions")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  async createPrescription(@Body() prescriptionDTO: PrescriptionDTO): Promise<any> {
    try {
      return await this.pharmacistService.createPrescription(prescriptionDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get("/inventory")
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async viewInventory(@Request() req): Promise<any> {
    try {
      return await this.pharmacistService.viewInventory(req.user.email);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put("/inventory/:id")
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateInventory(@Param('id') id: string, @Body() medicationInventoryDTO: MedicationInventoryDTO): Promise<any> {
    try {
      return await this.pharmacistService.updateInventory(id, medicationInventoryDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete("/inventory/:id")
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async deleteInventory(@Param('id') id: string): Promise<any> {
    try {
      return await this.pharmacistService.deleteInventory(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post("/inventory/alerts")
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async receiveMedicationAlerts(@Request() req, @Body() medicationAlertDTO: MedicationAlertDTO): Promise<any> {
    try {
      return await this.pharmacistService.receiveMedicationAlerts(req.user.email, medicationAlertDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post("/billing")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  async createBilling(@Request() req, @Body() billingDTO: BillingDTO): Promise<any> {
    try {
      return await this.pharmacistService.createBilling(req.user.email, billingDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

