import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.session.Patient_id !== undefined;
  }
}

/// Temp Session Guard is used in 2 cases only
// 1. While Signup, after providing Email and Password, TempSessionGuard, temp_id is needed to send the patients other details
// 2. Used it while sending request for forgetting password

export class TempSessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.session.temp_id !== undefined;
  }
}
