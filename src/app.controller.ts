import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiHideProperty, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAuthGuard } from './common/helpers/jwt.guards';
import { AuthService } from './modules/auth/auth.service';
//import { AuthenticatedGuard } from './common/helpers/authenticated.guards';
import { LocalAuthGuard } from './modules/auth/local.auth.guard';
//there two ways to authenticate using passport session/ JWT, we choose the second one

@ApiTags('controller')
@Controller()
//@ApiExcludeController()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard) //these comments are for session Authentication, they've been turned off in order to JWT access token
  @Post('/authenticate')
  @ApiOperation({ summary: 'Authenticate and provide token Provider' })
  login(@Request() req): any {
    return this.authService.login(req); //TODO: return JWT access token
  }
  @UseGuards(JwtAuthGuard)
  //@UseGuards(AuthenticatedGuard)
  @Get()
  @ApiHideProperty()
  getHello(): any {
    //return req.user;
    return this.appService.getHello(); //TODO: require an Bearer token, validate token
  }
}
