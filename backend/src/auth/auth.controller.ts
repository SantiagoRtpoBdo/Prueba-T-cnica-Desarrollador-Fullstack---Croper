import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiBody({ type: AuthDto })
    async register(@Body() dto: AuthDto) {
        return this.authService.register(dto.username, dto.password);
    }

    @Post('login')
    @ApiBody({ type: AuthDto })
    async login(@Body() dto: AuthDto) {
        return this.authService.login(dto.username, dto.password);
    }
}

