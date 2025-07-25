"use client";

import { EmissionResult } from "@/types/emissions";
import React from "react";

type Props = {
  data: EmissionResult[];
};

export default function DataTable({ data }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Detailed Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Quarter</th>
              <th className="px-4 py-2 border">Actual</th>
              <th className="px-4 py-2 border">Baseline Min</th>
              <th className="px-4 py-2 border">Deviation %</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{item.quarter}</td>
                <td className="px-4 py-2 border">{item.actual}</td>
                <td className="px-4 py-2 border">{item.baseline.min}</td>
                <td className="px-4 py-2 border">{item.deviationPercent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
