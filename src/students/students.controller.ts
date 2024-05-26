import { Controller, Post, Body } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from 'src/dto/student.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CheckCredentialsDto } from 'src/dto/check-credentials.dto';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('check')
  @ApiOperation({ summary: 'Check if a student exists' })
  @ApiResponse({ status: 200, description: 'Student exists or not', type: Boolean })
  @ApiBody({ type: CheckCredentialsDto })
  async checkCredentials(@Body() checkCredentialsDto: CheckCredentialsDto): Promise<{ exists: boolean }> {
    const { studentId, studentPassword } = checkCredentialsDto;
    const exists = await this.studentsService.checkCredentials(studentId, studentPassword);
    return { exists };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new student' })
  @ApiResponse({ status: 201, description: 'The student has been successfully created.', type: CreateStudentDto })
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    const student = await this.studentsService.createStudent(createStudentDto);
    return student;
  }
}
