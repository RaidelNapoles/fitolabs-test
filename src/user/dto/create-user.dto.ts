import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true, example: 'Raidel' })
  @IsString()
  name: string;

  @ApiProperty({ required: true, example: 27 })
  @IsInt()
  age: number;

  @ApiProperty({ required: true, example: true })
  @IsBoolean()
  active: boolean;
}
