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
    const authHeader = request.headers['authorization']

    //validasi cek token
    if(!authHeader) throw new UnauthorizedException('No token existed!')

    const [bearer,token] = authHeader.split(' ')
    
    //validasi format
    if(!bearer || !token) throw new UnauthorizedException('Invalid token format!')

    const payload = this.authService.verifyToken(token)
    if(!payload) throw new UnauthorizedException('Token invalid!')

    request.user = payload

    const requiredRoles = Reflect.getMetadata('role',context.getHandler())||[];
    if(requiredRoles.length && !requiredRoles.some(role=> payload.role?.includes(role))){
      throw new UnauthorizedException('Forbidden')
    }

    return true;
  }
}
