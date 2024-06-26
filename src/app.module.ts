import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { AnnouncementsModule } from './announcement/announcement.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CommentsModule } from './comments/comments.module';



@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Register the default JWT strategy
    JwtModule.register({

      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/aauconnectifyhello'),
    StudentsModule,
    AuthModule,
    AnnouncementsModule,
    CommentsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
