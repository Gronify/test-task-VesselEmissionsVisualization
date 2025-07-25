"use client";

import { Vessel } from "@/types/emissions";
import React from "react";

type Props = {
  vessels: Vessel[];
  selectedId: number | null;
  dwt: number;
  onIdChange: (id: number) => void;
  onDwtChange: (dwt: number) => void;
  onLoad: () => void;
};

export default function Controls({
  vessels,
  selectedId,
  dwt,
  onIdChange,
  onDwtChange,
  onLoad,
}: Props) {
  return (
    <div className="flex gap-4 items-end">
      <div>
        <label className="block text-sm font-medium">Vessel</label>
        <select
          value={selectedId ?? ""}
          onChange={(e) => onIdChange(Number(e.target.value))}
          className="border px-2 py-1 rounded w-60"
        >
          {vessels.map((v) => (
            <option key={v.IMONo} value={v.IMONo}>
              {v.Name} ({v.IMONo})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">DWT</label>
        <input
          type="number"
          value={dwt}
          onChange={(e) => onDwtChange(Number(e.target.value))}
          className="border px-2 py-1 rounded w-40"
        />
      </div>
      <button
        onClick={onLoad}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Load
      </button>
    </div>
  );
}
