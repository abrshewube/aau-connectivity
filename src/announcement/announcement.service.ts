// announcement.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAnnouncementDto } from 'src/dto/create-announcement.dto';
import { UpdateAnnouncementDto } from 'src/dto/update-announcement.dto';
import { Announcement } from 'src/schemas/announcement.schema';
// import * as cloudinary from 'cloudinary';


@Injectable()
export class AnnouncementService {
  constructor(
    // private readonly jwtService: JwtService,
    @InjectModel(Announcement.name) private announcementModel: Model<Announcement>,
  ) {}

  async create(createAnnouncementDto: CreateAnnouncementDto): Promise<Announcement> {
    const createdAnnouncement = new this.announcementModel(createAnnouncementDto);
    return createdAnnouncement.save();
  }
  async findAll(page: number, limit: number): Promise<Announcement[]> {
    return this.announcementModel.find().skip((page - 1) * limit).limit(limit).exec();
  }

  async findById(id: string): Promise<Announcement> {
    const announcement = await this.announcementModel.findById(id).exec();
    if (!announcement) {
      throw new NotFoundException('Announcement not found');
    }
    return announcement;
  }

  async update(id: string, updateAnnouncementDto: UpdateAnnouncementDto): Promise<Announcement> {
    const announcement = await this.findById(id);
    announcement.set(updateAnnouncementDto);
    return announcement.save();
  }

  async remove(id: string): Promise<Announcement> {
    const announcement = await this.announcementModel.findById(id).exec();
    if (!announcement) {
      throw new NotFoundException('Announcement not found');
    }
    return this.announcementModel.findByIdAndDelete(id).exec();
  }

 
  
}
