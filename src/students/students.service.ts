import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from 'src/dto/student.dto';
import { Student } from 'src/schemas/student.schema';

@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student.name) private studentModel: Model<Student>) {}

  async checkCredentials(studentId: string, studentPassword: string): Promise<boolean> {
    const student = await this.studentModel.findOne({ studentId,studentPassword }).exec();
    return !!student;
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = new this.studentModel(createStudentDto);
    return newStudent.save();
  }
}
