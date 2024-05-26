// comments.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment,CommentSchema } from 'src/schemas/comment.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])
],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
