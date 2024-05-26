import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from 'src/dto/student.dto';
import { Student } from 'src/schemas/student.schema';

@Injectable()
export class StudentsService {
  private readonly logger = new Logger(StudentsService.name);

  constructor(@InjectModel(Student.name) private studentModel: Model<Student>) {}


  async checkCredentials(studentId: string, studentPassword: string): Promise<boolean> {
    this.logger.debug(`Checking credentials for studentId: ${studentId}`);
    const student = await this.studentModel.findOne({ studentId, studentPassword, used: false }).exec();
    if (student) {
      this.logger.debug(`Student found: ${student}`);
    } else {
      this.logger.debug(`No student found with studentId: ${studentId}, studentPassword: ${studentPassword}, used: false`);
    }
    return student !== null;
  }
  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = new this.studentModel(createStudentDto);
    return newStudent.save();
  }
}
