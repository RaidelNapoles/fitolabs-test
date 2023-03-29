import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class DateFilterDto {
  @ApiProperty({
    required: false,
    description: `Fecha de inicio para el filtro de usuarios`,
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dateFrom?: Date;

  @ApiProperty({
    required: false,
    description: `Fecha de fin para el filtro de usuarios`,
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dateTo?: Date;
}
