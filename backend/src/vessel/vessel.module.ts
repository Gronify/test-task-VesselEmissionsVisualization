import { Module } from '@nestjs/common';
import { PrismaModule } from '@/infra/config/prisma/prisma.module';
import { VesselService } from './vessel.service';
import { VesselController } from './vessel.controller';

@Module({
  imports: [PrismaModule],
  controllers: [VesselController],
  providers: [VesselService],
  exports: [VesselService],
})
export class VesselModule {}
