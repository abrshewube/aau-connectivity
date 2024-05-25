import { Controller, Post, Body } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from 'src/dto/student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('check')
  async checkCredentials(
    @Body('studentId') studentId: string,
    @Body('password') password: string,
  ): Promise<{ exists: boolean }> {
    const exists = await this.studentsService.checkCredentials(studentId, password);
    return { exists };
  }


  @Post()
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    const student = await this.studentsService.createStudent(createStudentDto);
    return student;
  }
}
