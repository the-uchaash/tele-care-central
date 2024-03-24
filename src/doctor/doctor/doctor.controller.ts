import {
    Body,
    Controller,
    Get,
    HttpStatus,
    InternalServerErrorException,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
    Request,
    Put,
    NotFoundException,
    Delete,
    Param,
    ParseIntPipe,
    BadRequestException,
    UseInterceptors,
    UploadedFile,
    Res,
    HttpCode,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
    UploadedFiles
    

  } from "@nestjs/common";
  import { DoctorService } from "./doctor.service";
  
  import {
    AppointmentDTO,
    BillingDTO,
    FeedbackDTO,
    ForgetPasswordDTO,
    OTP_ReceiverDTO,
    // Patient_ProfileDTO,
    DoctorDTO,
  } from "./doctor.dto";
  
  import { JwtService } from "@nestjs/jwt";
  import { AuthGuard } from "./auth/auth.guard";
  import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
  import { diskStorage, MulterError } from "multer";
import { DoctorEntity } from "./doctor.entity";
  
  @Controller("api/doctor")
  export class DoctorController 
  {
    constructor(
      private readonly doctorService: DoctorService,
      private readonly jwtService: JwtService,
    ) {
      // Empty Constructor
    }
  
    @Get("/index")
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK) // Set the status code to 200 (OK)
    getIndex(): any {
      return "Relax! Doctor is Alive.";
    }
    @Get("/patient_service")
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK) // Set the status code to 200 (OK)
    getService(): any {
      return this.doctorService.get_service();
    }
  

    //-------------Start Features--------------//


    //---1----
    //---Create Doctor Details


    @Post('/register/doctors_details')
    @UseGuards(AuthGuard)
    // @UseInterceptors(FilesInterceptor('image',))
    @UseInterceptors(FileInterceptor('image', {
      storage: diskStorage({
          destination: './uploads',
          filename: function (req, file, cb) {
              cb(null, Date.now() + file.originalname)
          }
      })
  }))
    @UsePipes(new ValidationPipe({ transform: true }))
    @HttpCode(HttpStatus.OK)
    async doctorDetailsCreate(
      @Body() doctorInfo: DoctorDTO, 
      @UploadedFile(
        new ParseFilePipe({
          fileIsRequired: true,
          validators:[
            new MaxFileSizeValidator({ maxSize: 16000000 }),
            // new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
          ]
        })
      ) file: Express.Multer.File
    ): Promise<any> {
        try {
            // Check if doctor information already exists for the logged-in user
            console.log(file)
            doctorInfo.image = file.filename;
            const existingDoctor = await this.doctorService.findDoctorByUserId(doctorInfo.userId);
            if (existingDoctor) {
                throw new BadRequestException({
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Doctor information already exists for this user',
                });
            }

            // If no existing doctor information, proceed with creating the doctor
            const savedDoctor = await this.doctorService.Create_Doctor(doctorInfo);
            return savedDoctor;
        } 
        
        catch (e) {
            throw new BadRequestException({
                status: HttpStatus.BAD_REQUEST,
                message: e.message,
            });
        }
    }


    //---2----
    //---Get Appointment Details


  @Get("appointment/list") 
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  async GetAllAppointmentList(@Request() req): Promise<any> 
  { 
    try
    {
      const appointmentList = await this.doctorService.GetApoinments(
        
      );

      if (appointmentList.length > 0) {
        return appointmentList;
      } else {
        throw new NotFoundException("No Appointments found"); // corrected error message
      }
    } 
    
    catch (e) 
    {
      throw new InternalServerErrorException(e.message);
    }
  }


  //---3----
  //---Accept Appointment

  @Put(':id/apoinment/accept')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)

  async acceptAppointment(@Request() req,@Param('id') id: number, @Body('scheduledTime') scheduledTime: string): Promise<any> {
    
    if (!scheduledTime) {
      throw new BadRequestException('Schedule time must be provided');
    }

    try {

      const doct_id = req.user.id;
      console.log("hdgd",doct_id);
      const updatedAppointment = await this.doctorService.updateAppointment(id, scheduledTime,doct_id);
      return {
        message: 'Appointment Accepted and Scheduled successfully',
        appointment: updatedAppointment,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }



    //---4----
    //---Get Appointment Details


    @Get("service/list") 
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    async GetService(@Request() req): Promise<any> 
    { 
      try
      {
        const serviceList = await this.doctorService.GetService(
          
        );
  
        if (serviceList.length > 0) 
        {
          return serviceList;
        } 
        
        else 
        {
          throw new NotFoundException("No Service Request found"); 
        }
      } 
      
      catch (e) 
      {
        throw new InternalServerErrorException(e.message);
      }
    }



    //---5----
  //---Response Service Request

  @Post(':id/eService/response')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  async ResponseService(
    @Param('id') id: number,
    @Body('doctorDescription') doctorDescription: string,
    @Body('patient_id') patient_id: number,
    @Request() req
  ): Promise<any> {

    // return req.user;
    const doct_id = req.user.id;
    console.log("Pp",doct_id );
    if (!doctorDescription) {
      throw new BadRequestException('Must write a description for the service request');
    }

    try {
      const updatedService = await this.doctorService.ResponseService(id,doct_id, doctorDescription);
      return {
        message: 'Response sent successfully',
        service: updatedService,
      };
    } 
    catch (error) 
    {
      throw new NotFoundException(error.message);
    }
  }

  //---6----
  //---Doctor Profile

  @Get('/profile')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  async getDoctorProfile(@Request() req
  ): Promise<any> {
  {
    try 
    {
      const doct_id = req.user.id;
      const doctorProfile = await this.doctorService.doctorProfile(doct_id);
      return doctorProfile;
    } 
    catch (error) 
    {
      if (error instanceof NotFoundException) 
      {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}



//---7----
//---Doctor Profile update
@Post('/profile/update')
@UseInterceptors(FileInterceptor('image', {
  storage: diskStorage({
      destination: './uploads',
      filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname)
      }
  })
}))
@UseGuards(AuthGuard)
@UsePipes(new ValidationPipe({ transform: true }))
@HttpCode(HttpStatus.OK)
async updateDoctorProfile(@Request() req,@UploadedFile(
  new ParseFilePipe({
    fileIsRequired: true,
    validators:[
      new MaxFileSizeValidator({ maxSize: 16000000 }),
      // new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ]
  })
) file: Express.Multer.File , @Body() doctorEntity: DoctorEntity): Promise<any> 
{
  try {
    const doct_id = req.user.id;
    doctorEntity.image = file.filename;
    const updatedDoctorProfile = await this.doctorService.updateProfile(doct_id, doctorEntity);
    return {
      message: 'Doctor profile updated successfully',
      doctorProfile: updatedDoctorProfile,
    };
  } 
  catch (error) 
  {
    if (error instanceof NotFoundException) 
    {
      throw new NotFoundException(error.message);
    }
    throw error;
  }
}





}