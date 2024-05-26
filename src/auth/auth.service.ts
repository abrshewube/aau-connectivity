import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { VerifyEmailDto } from 'src/dto/verify-email.dto';
import { User } from 'src/schemas/user.schema';
import { Student } from 'src/schemas/student.schema';
import * as jwt from 'jsonwebtoken';
import { UserRole } from 'src/schemas/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { studentId, studentPassword, email } = createUserDto;
    
    // Check if the student ID and password are valid and 'used' status is false
    const student = await this.studentModel.findOne({ studentId, studentPassword, used: false });
    if (!student) {
      throw new HttpException('Student ID is already used', HttpStatus.BAD_REQUEST);
    }

    // Send verification code to the user's email
    const verificationCode = await this.sendVerificationCode(email);

    // Create a new user with a hashed password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({ ...createUserDto, password: hashedPassword, verificationCode });
    await newUser.save();

    // Set the 'used' status of the student to true after successful registration
    await this.studentModel.updateOne({ _id: student._id }, { used: true });

    return newUser;
  }

  async sendVerificationCode(email: string): Promise<string> {
    const verificationCode = this.generateVerificationCode();
    await this.mailerService.sendMail({
      to: email,
      subject: 'Email Verification',
      text: `Your verification code is ${verificationCode}`,
    });
    return verificationCode;
  }

  async verifyEmailCode(verifyEmailDto: VerifyEmailDto): Promise<boolean> {
    const { email, code } = verifyEmailDto;
    const user = await this.userModel.findOne({ email, verificationCode: code });
    if (user) {
      user.status = true;
      await user.save();
      return true;
    }
    return false;
  }
  async generateJwtToken(user: User): Promise<string> {
    const payload = {
      email: user.email,
      role: user.role, // Include the user's role
    };
    const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
    return token;
  }
  private generateVerificationCode(): string {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  }

  async verifyUser(email: string, password: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email, status: true });
    if (user && await bcrypt.compare(password, user.password)) {
      return true;
    }
    return false;
  }

  async sendPasswordResetEmail(email: string, verificationCode: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset Verification Code',
      text: `Your password reset verification code is: ${verificationCode}`,
    });
  }

  async validateToken(token: string): Promise<any> {
    try {
      const decodedToken = this.jwtService.verify(token);
      
      const { email, role } = decodedToken;
  
     
      return { email, role };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }

  // New methods for superadmin functionalities
  async changeUserRole(userId: string, newRole: UserRole): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.role = newRole;
    return user.save();
  }
  async deleteUser(userId: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: userId });
    if (result.deletedCount === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  
}
