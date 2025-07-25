import { Module } from '@nestjs/common';
import { DeviationService } from './deviation.service';
import { DeviationController } from './deviation.controller';
import { PrismaModule } from '@/infra/config/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DeviationController],
  providers: [DeviationService],
  exports: [DeviationService],
})
export class DeviationModule {}
