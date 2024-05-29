import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  readonly fullName: string;

  @ApiProperty({ example: 'Computer Science', description: 'Field of study' })
  readonly fieldOfStudy: string;

  @ApiProperty({ example: 'This is a bio', description: 'Bio of the user', required: false })
  readonly bio?: string;

  @ApiProperty({ example: 'http://example.com/profile.jpg', description: 'Profile picture URL', required: false })
  readonly profilePicture?: string;
}
