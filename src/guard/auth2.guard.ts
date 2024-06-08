import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CustomAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Check if the route is related to profile management
    const request = context.switchToHttp().getRequest();
    const isProfileRoute = request.url.includes('profile') || request.url.includes('reset-password');

    // If it's a profile route, just check if the user is authenticated
    if (isProfileRoute) {
      return super.canActivate(context);
    }

    // For other routes, perform role checking as usual
    return super.canActivate(context);
  }
}
