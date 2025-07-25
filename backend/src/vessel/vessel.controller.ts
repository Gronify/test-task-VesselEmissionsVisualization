import { Controller, Get, Param } from '@nestjs/common';
import { VesselService } from './vessel.service';

@Controller('vessels')
export class VesselController {
  constructor(private readonly vesselService: VesselService) {}

  @Get()
  async getVessels() {
    return this.vesselService.getVessels();
  }
}
