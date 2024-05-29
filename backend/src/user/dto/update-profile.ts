import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  file: Express.Multer.File;
  
  @IsString()
  @IsOptional()
  profileName?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsOptional()
  @IsString()
  birthDate?: string;
}
