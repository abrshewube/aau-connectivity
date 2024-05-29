import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Profile extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true, unique: true })
  user: User;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  fieldOfStudy: string;

  @Prop()
  bio: string;

  @Prop()
  profilePicture: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
