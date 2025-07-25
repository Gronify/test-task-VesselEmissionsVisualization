import { PrismaClient } from '@prisma/client';
const fs = require('fs/promises');

const prisma = new PrismaClient();

async function main() {
  // Vessels
  console.log('read Vessels');
  const vesselsRaw = await fs.readFile('data/vessels.json', 'utf-8');
  const vessels = JSON.parse(vesselsRaw);
  for (const v of vessels) {
    await prisma.vessel.upsert({
      where: { IMONo: v.IMONo },
      update: {},
      create: {
        IMONo: v.IMONo,
        Name: v.Name,
        VesselType: v.VesselType,
      },
    });
  }

  // CE_PPSCCReferenceLine
  console.log('read CE_PPSCCReferenceLine');
  const refsRaw = await fs.readFile('data/pp-reference.json', 'utf-8');
  const refs = JSON.parse(refsRaw);
  for (const r of refs) {
    await prisma.cE_PPSCCReferenceLine.create({
      data: {
        RowID: r.RowID,
        Category: r.Category.trim(),
        VesselTypeID: r.VesselTypeID,
        Size: r.Size.trim(),
        Traj: r.Traj.trim(),
        a: r.a,
        b: r.b,
        c: r.c,
        d: r.d,
        e: r.e,
      },
    });
  }

  // DailyLogEmissions
  console.log('read DailyLogEmissions');
  const emissionsRaw = await fs.readFile(
    'data/daily-log-emissions.json',
    'utf-8',
  );
  const emissions = JSON.parse(emissionsRaw);
  for (const e of emissions) {
    await prisma.dailyLogEmission.create({
      data: {
        EID: e.EID,
        VesselID: e.VesselID,
        LOGID: BigInt(e.LOGID),
        FromUTC: new Date(e.FromUTC),
        TOUTC: new Date(e.TOUTC),
        MET2WCO2: e.MET2WCO2,
        AET2WCO2: e.AET2WCO2,
        BOT2WCO2: e.BOT2WCO2,
        VRT2WCO2: e.VRT2WCO2,
        TotT2WCO2: e.TotT2WCO2,
        MEW2WCO2e: e.MEW2WCO2e,
        AEW2WCO2e: e.AEW2WCO2e,
        BOW2WCO2e: e.BOW2WCO2e,
        VRW2WCO2e: e.VRW2WCO2e,
        ToTW2WCO2: e.ToTW2WCO2,
        MESox: e.MESox,
        AESox: e.AESox,
        BOSox: e.BOSox,
        VRSox: e.VRSox,
        TotSOx: e.TotSOx,
        MENOx: e.MENOx,
        AENOx: e.AENOx,
        TotNOx: e.TotNOx,
        MEPM10: e.MEPM10,
        AEPM10: e.AEPM10,
        TotPM10: e.TotPM10,
        AERCO2T2W: e.AERCO2T2W,
        AERCO2eW2W: e.AERCO2eW2W,
        EEOICO2eW2W: e.EEOICO2eW2W,
        CreatedAt: new Date(e.CreatedAt),
        UpdatedAt: new Date(e.UpdatedAt),
      },
    });
  }

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
