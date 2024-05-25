// announcement.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from 'src/dto/create-announcement.dto';
import { UpdateAnnouncementDto } from 'src/dto/update-announcement.dto';

import { Announcement } from 'src/schemas/announcement.schema';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';

@ApiTags('announcements')
@Controller('announcements')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  @UseGuards(AuthGuard) // Use the AuthGuard
  @ApiOperation({ summary: 'Create a new announcement' })
  @ApiBearerAuth()
  create(@Body() createAnnouncementDto: CreateAnnouncementDto): Promise<Announcement> {
    return this.announcementService.create(createAnnouncementDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all announcements with pagination' })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(@Query('page') page: number, @Query('limit') limit: number): Promise<Announcement[]> {
    return this.announcementService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get announcement by ID' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string): Promise<Announcement> {
    return this.announcementService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard) // Use the AuthGuard
  @ApiOperation({ summary: 'Update an announcement by ID' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String })
  update(
    @Param('id') id: string,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
  ): Promise<Announcement> {
    return this.announcementService.update(id, updateAnnouncementDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard) // Use the AuthGuard
  @ApiOperation({ summary: 'Delete an announcement by ID' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string): Promise<Announcement> {
    return this.announcementService.remove(id);
  }
}
