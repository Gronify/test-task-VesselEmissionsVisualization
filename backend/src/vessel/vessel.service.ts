import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/config/prisma/prisma.service';

@Injectable()
export class VesselService {
  constructor(private prisma: PrismaService) {}

  async getVessels() {
    const vessels = await this.prisma.vessel.findMany({});

    return vessels;
  }
}
