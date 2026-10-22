import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('video-processing', {
  concurrency: 3,
  limiter: { max: 10, duration: 10_000 },
})
export class VideoWorker extends WorkerHost {
  async process(job: Job) {
    // Task processing logic here
    job;
    console.log({ jobId: job.id });
    await new Promise((resolve) => setTimeout(resolve, 5_000));
    const parsedJobId = parseInt(job.id as string, 10);
    if (parsedJobId % 3 === 0) {
      throw new Error('File corrupted');
    }
    console.log('Completed job with jobId: ', job.id);
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log('active job :', job.id);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log('completed job :', job.id);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    console.log('failed job: ', job.id);
    console.log('Attempted retried: ', job.attemptsMade);
  }
}
