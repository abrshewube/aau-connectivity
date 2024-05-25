// announcements.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Announcement, AnnouncementSchema } from 'src/schemas/announcement.schema';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: Announcement.name, schema: AnnouncementSchema }]),
    AuthModule
  ],
  controllers: [AnnouncementController],
  providers: [AnnouncementService], // Add AuthGuard to the providers array
})
export class AnnouncementsModule {}
