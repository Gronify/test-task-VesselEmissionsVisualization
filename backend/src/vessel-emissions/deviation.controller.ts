import { Controller, Get, Param } from '@nestjs/common';
import { DeviationService } from './deviation.service';

@Controller('vessels-emission/:id/:dwt')
export class DeviationController {
  constructor(private readonly deviationService: DeviationService) {}

  @Get()
  async getDeviations(@Param('id') id: string, @Param('dwt') dwt: string) {
    return this.deviationService.getQuarterlyDeviations(
      Number(id),
      Number(dwt),
    );
  }
}
