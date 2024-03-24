import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Check if the session contains the required property (e.g., Patient_id)
    return request.session && request.session.Patient_id !== undefined;
  }
}
