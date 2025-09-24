import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //get token header
    const request = context.switchToHttp().getRequest()
    const authHeader = request.cookies.token

    //validasi cek token
    if(!authHeader) throw new UnauthorizedException('No token existed!')

    const payload = this.authService.verifyToken(authHeader)
    if(!payload) throw new UnauthorizedException('Token invalid!')

    request.user = payload
    const requiredRoles = Reflect.getMetadata('role',context.getHandler())||[];
    if(requiredRoles.length&&payload.role!==requiredRoles[0]){
        console.log('woyy')
        throw new UnauthorizedException('Forbidden')
    }

    return true;
  }
}
