import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    // Retrieve required roles from metadata
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No roles specified, allow access
    }

    // Extract the request and token
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) return false; // No token, deny access

    // Verify the token and extract user details
    const user = this.jwtService.verify(token);

    // Check if the user's Role matches one of the required roles
    return requiredRoles.includes(user.Role); // `user.Role` is a string
  }
}
