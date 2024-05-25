import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { VerifyEmailDto } from 'src/dto/verify-email.dto';
import { LoginDto } from 'src/dto/login.dto';
import { VerifyEmailResponseDto } from 'src/dto/verify-email-response.dto'; // Import the new DTO
import { User } from 'src/schemas/user.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully registered.' })
  @ApiBody({ type: CreateUserDto })
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.authService.register(createUserDto);
      return { message: 'User registered successfully. Verification code sent to your email.' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('verify-email')
  @ApiOperation({ summary: 'Verify email with verification code' })
  @ApiResponse({ status: 200, description: 'Email verified successfully.', type: VerifyEmailResponseDto })
  @ApiBody({ type: VerifyEmailDto })
  async verifyEmailCode(@Body() verifyEmailDto: VerifyEmailDto): Promise<{ message: string; token: string }> {
    try {
      const isVerified = await this.authService.verifyEmailCode(verifyEmailDto);
      if (isVerified) {
        const user = await this.authService.findByEmail(verifyEmailDto.email);
        if (!user) {
          throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        }
        const token = await this.authService.generateJwtToken(user);
        return { message: 'Email verified successfully.', token };
      } else {
        throw new HttpException('Invalid verification code or email.', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    try {
      const { email, password } = loginDto;
      // Verify if the user exists and is verified
      const isValidUser = await this.authService.verifyUser(email, password);
      if (!isValidUser) {
        throw new HttpException('Invalid email or password.', HttpStatus.UNAUTHORIZED);
      }

      // Get the user from your database or another source
      const user: User = await this.authService.findByEmail(email);

      // Generate JWT token if user is valid
      const token = await this.authService.generateJwtToken(user);
      return { accessToken: token };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
}
