export type EmissionResult = {
  quarter: string;
  date: string;
  actual: number;
  baseline: {
    min: number;
    striving: number;
    yxLow: number;
    yxUp: number;
  };
  deviationPercent: string;
};

export type Vessel = {
  IMONo: number;
  Name: string;
  VesselType: number;
};
