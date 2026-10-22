import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { VideoController } from './video.controller.js';
import { VideoWorker } from './video.worker.js';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'video-processing',
      useFactory: () => ({
        defaultJobOptions: {
          attempts: 3,
          removeOnComplete: 100,
          removeOnFail: 100,
        },
      }),
    }),
  ],
  controllers: [VideoController],
  providers: [VideoWorker],
})
export class VideoModule {}
