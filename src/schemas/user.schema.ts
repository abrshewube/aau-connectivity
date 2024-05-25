import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop({ default: false })
  status: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
