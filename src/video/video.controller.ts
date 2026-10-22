import { InjectQueue } from '@nestjs/bullmq';
import { Body, Controller, Post } from '@nestjs/common';
import { Queue } from 'bullmq';
import { CreateVideoJobDto } from './video.dto.js';

@Controller('video')
export class VideoController {
  constructor(
    @InjectQueue('video-processing') private readonly videoQueue: Queue,
  ) {}

  @Post('process')
  async processVideo(@Body() body: CreateVideoJobDto) {
    await this.videoQueue.add('process', body);
    return {
      message: 'Video processing job added to queue',
    };
  }
}
