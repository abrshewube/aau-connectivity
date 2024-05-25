import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://abenezerzgeyework:NKx7e1prjVAOuHsh@cluster0.dcmutbn.mongodb.net/aau-connectify?retryWrites=true&w=majority&appName=Cluster0'),
    StudentsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
