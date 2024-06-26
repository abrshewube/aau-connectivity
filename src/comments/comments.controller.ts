import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/dto/update-comment.dto';
import { Comment } from 'src/schemas/comment.schema';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/guard/auth2.guard';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateCommentDto })
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments by announcement ID' })
  async findAll(@Query('announcementId') announcementId: string): Promise<Comment[]> {
    return this.commentsService.findAllByAnnouncementId(announcementId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: 'Update a comment by ID' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateCommentDto })
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.remove(id);
  }
}
