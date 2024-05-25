import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { AnnouncementsModule } from './announcement/announcement.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Register the default JWT strategy
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forRoot('mongodb+srv://abenezerzgeyework:NKx7e1prjVAOuHsh@cluster0.dcmutbn.mongodb.net/aau?retryWrites=true&w=majority&appName=Cluster0'),
    StudentsModule,
    AuthModule,
    AnnouncementsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
