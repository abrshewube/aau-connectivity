// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from './user-role.enum';


@Schema()
export class User extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  studentPassword: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ default: false })
  status: boolean;

  @Prop()
  verificationCode: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
