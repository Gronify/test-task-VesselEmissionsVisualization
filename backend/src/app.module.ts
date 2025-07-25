import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/config/prisma/prisma.module';
import { DeviationModule } from './vessel-emissions/deviation.module';
import { VesselModule } from './vessel/vessel.module';

@Module({
  imports: [VesselModule, DeviationModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
