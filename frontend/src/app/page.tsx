"use client";

import React, { useEffect, useState } from "react";
import Controls from "@/components/Controls";
import EmissionsChart from "@/components/Chart";
import DataTable from "@/components/DataTable";
import { EmissionResult, Vessel } from "@/types/emissions";

export default function EmissionsChartPage() {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(9836476);
  const [dwt, setDwt] = useState<number>(81703);
  const [data, setData] = useState<EmissionResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/vessels")
      .then((res) => res.json())
      .then((vessels: Vessel[]) => {
        setVessels(vessels);
        setSelectedId(vessels[0]?.IMONo ?? null);
      })
      .catch((err) => setError(err.message));
  }, []);

  const loadData = () => {
    if (!selectedId) return;
    fetch(`http://localhost:5000/vessels-emission/${selectedId}/${dwt}`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    loadData();
  }, [selectedId]);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Vessel Emissions</h1>

      <Controls
        vessels={vessels}
        selectedId={selectedId}
        dwt={dwt}
        onIdChange={setSelectedId}
        onDwtChange={setDwt}
        onLoad={loadData}
      />

      <EmissionsChart data={data} />

      <DataTable data={data} />

      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}
