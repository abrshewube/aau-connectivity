import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cloudinary from 'cloudinary';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Cloudinary configuration
   cloudinary.v2.config({
    cloud_name: 'dcixfqemc', 
  api_key: '443894683639552', 
  api_secret: 'bhj1-SWNgJSdjnFZE7Yv0jFqTMs'
  });

  const config = new DocumentBuilder()
    .setTitle('AAU-CONNECTIFY API')
    .setDescription('API documentation for the Students service')
    .setVersion('1.0')
    .addBearerAuth() // Add this line to enable bearer token authentication
    .addTag('students')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
