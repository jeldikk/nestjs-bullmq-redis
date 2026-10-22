import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateVideoJobDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  fileType: string;

  @IsArray()
  targetFormats: string[];
}
