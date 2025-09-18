import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  it('should be defined', () => {
    const guard = new AuthGuard(new AuthService(new JwtService))
    expect(guard).toBeDefined();
  });
});
