import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt.auth.guard';
import { Public } from './shared/decorators/public.decorator';
import { ApiBearerAuth, ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  @Public()
  @Get()
  getHello(): string {
    return 'Hello World';
  }

  @Get('/protected')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  protected(@Req() req) {
    return {
      message: 'AuthGuard works 🎉',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      authenticated_user: req.user,
    };
  }
}
