import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/config/prisma/prisma.service';
import { calculatePPSCCBaselines } from '../utils/calculate-pp-scc-baselines.util';
import Decimal from 'decimal.js';
import { groupByQuarter } from './utils/group-by-quarter.util';

@Injectable()
export class DeviationService {
  constructor(private prisma: PrismaService) {}

  async getQuarterlyDeviations(vesselId: number, DWT: number) {
    const [vessel, emissions] = await Promise.all([
      this.prisma.vessel.findUnique({
        where: { IMONo: vesselId },
      }),
      this.prisma.dailyLogEmission.findMany({
        where: { VesselID: vesselId },
        orderBy: { TOUTC: 'asc' },
      }),
    ]);

    const factors = await this.prisma.cE_PPSCCReferenceLine.findMany({
      where: { VesselTypeID: vessel.VesselType },
    });

    const grouped = groupByQuarter(emissions);

    const results = Array.from(grouped.entries()).map(([quarter, record]) => {
      const date = new Date(record.TOUTC);
      const year = date.getUTCFullYear();

      const baseline = calculatePPSCCBaselines({
        factors,
        year,
        DWT: new Decimal(DWT),
      });

      const actual = new Decimal(record.EEOICO2eW2W || 0);
      const deviation = baseline.min.eq(0)
        ? new Decimal(0)
        : actual.minus(baseline.min).div(baseline.min).mul(100);

      return {
        quarter,
        date: record.TOUTC,
        actual: actual.toNumber(),
        baseline,
        deviationPercent: deviation.toFixed(2),
      };
    });

    return results;
  }
}
