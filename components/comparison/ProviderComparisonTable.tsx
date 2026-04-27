"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Provider } from "@/lib/types";

type Props = {
  providers: Provider[];
};

export function ProviderComparisonTable({ providers }: Props) {
  const [stateFilter, setStateFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState<"responsiveness" | "setupFee">("responsiveness");

  const rows = useMemo(() => {
    const filtered =
      stateFilter === "ALL"
        ? providers
        : providers.filter((provider) => provider.states.includes(stateFilter));

    return [...filtered].sort((a, b) => {
      if (sortBy === "setupFee") return a.setupFee - b.setupFee;
      return b.responsivenessScore - a.responsivenessScore;
    });
  }, [providers, sortBy, stateFilter]);

  return (
    <div className="glass-card">
      <h2>Provider comparison (non-rate factors)</h2>
      <div className="grid-two" style={{ marginBottom: "1rem" }}>
        <label>
          Filter by state
          <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
            <option value="ALL">All states</option>
            <option value="QLD">QLD</option>
            <option value="NSW">NSW</option>
            <option value="VIC">VIC</option>
            <option value="WA">WA</option>
            <option value="SA">SA</option>
            <option value="TAS">TAS</option>
            <option value="ACT">ACT</option>
            <option value="NT">NT</option>
          </select>
        </label>
        <label>
          Sort by
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "responsiveness" | "setupFee")}>
            <option value="responsiveness">Responsiveness (high to low)</option>
            <option value="setupFee">Setup fee (low to high)</option>
          </select>
        </label>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Service model</th>
              <th>Setup fee</th>
              <th>Admin fee / month</th>
              <th>Responsiveness</th>
              <th>States</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((provider) => (
              <tr key={provider.id}>
                <td>
                  <Link href={`/providers/${provider.slug}`}>{provider.name}</Link>
                </td>
                <td>{provider.serviceModel}</td>
                <td>${provider.setupFee}</td>
                <td>${provider.monthlyAdminFee}</td>
                <td>{provider.responsivenessScore}/10</td>
                <td>{provider.states.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
