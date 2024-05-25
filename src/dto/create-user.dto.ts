import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  readonly fullName: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email of the user' })
  readonly email: string;

  @ApiProperty({ example: 'password123', description: 'Password of the user' })
  readonly password: string;

  @ApiProperty({ example: 'student123', description: 'Student ID' })
  readonly studentId: string;

  @ApiProperty({ example: 'schoolpassword', description: 'Student password' })
  readonly studentPassword: string;

  @ApiProperty({ example: false, description: 'Status of the user', default: false })
  readonly status?: boolean;
}
