import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/config/prisma/prisma.module';
import { DeviationModule } from './vessel-emissions/deviation.module';

@Module({
  imports: [DeviationModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
