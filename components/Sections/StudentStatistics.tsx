"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  GraduationCap,
  TrendingUp,
  Users,
  ArrowUpRight,
  Table as TableIcon,
  BarChart3,
} from "lucide-react";
import type { StatisticStudent } from "@/types/statisticStudent";

interface StudentStatisticsProps {
  data: StatisticStudent[];
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: { year: number; masuk: number; keluar: number; total: number };
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-background/95 backdrop-blur-md border border-border p-4 rounded-xl shadow-xl ring-1 ring-slate-200/50">
      <p className="font-bold text-foreground mb-2 border-b border-border pb-2 text-sm">
        Tahun Akademik {label}
      </p>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-8 text-sm">
          <span className="text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Mahasiswa Baru
          </span>
          <span className="font-bold font-mono text-blue-600">
            +{payload[0].payload.masuk}
          </span>
        </div>
        <div className="flex items-center justify-between gap-8 text-sm">
          <span className="text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Lulusan
          </span>
          <span className="font-bold font-mono text-emerald-600">
            -{payload[0].payload.keluar}
          </span>
        </div>
        <div className="mt-2 pt-2 border-t border-dashed border-border flex items-center justify-between gap-8 text-sm">
          <span className="font-medium text-foreground">Total Aktif</span>
          <span className="font-bold font-mono text-foreground">
            {payload[0].payload.total.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function StudentStatistics({ data = [] }: StudentStatisticsProps) {
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart");

  const { chartData, summary } = useMemo(() => {
    if (!data.length) {
      return {
        chartData: [],
        summary: { totalActive: 0, totalGraduates: 0, totalEntered: 0, growthRate: 0 },
      };
    }

    // Urutkan data berdasarkan tahun
    const sortedData = [...data].sort((a, b) => a.year - b.year);

    // Proses data menggunakan reduce untuk immutability
    const result = sortedData.reduce((acc, item) => {
      const newRunningTotal = acc.runningTotal + item.enteredStudents - item.graduatedStudents;
      const newTotalGraduates = acc.totalGraduates + item.graduatedStudents;
      const newTotalEntered = acc.totalEntered + item.enteredStudents;

      acc.processedData.push({
        year: item.year,
        masuk: item.enteredStudents,
        keluar: item.graduatedStudents,
        total: Math.max(0, newRunningTotal),
      });

      return {
        processedData: acc.processedData,
        runningTotal: newRunningTotal,
        totalGraduates: newTotalGraduates,
        totalEntered: newTotalEntered,
      };
    }, { 
      processedData: [] as Array<{ year: number; masuk: number; keluar: number; total: number }>, 
      runningTotal: 0, 
      totalGraduates: 0,
      totalEntered: 0,
    });

    // Hitung growth rate (tahun terakhir vs tahun sebelumnya)
    let growthRate = 0;
    if (result.processedData.length >= 2) {
      const prev = result.processedData[result.processedData.length - 2].masuk;
      const curr = result.processedData[result.processedData.length - 1].masuk;
      if (prev > 0) growthRate = ((curr - prev) / prev) * 100;
    }

    return {
      chartData: result.processedData,
      summary: {
        totalActive: Math.max(0, result.runningTotal),
        totalGraduates: result.totalGraduates,
        totalEntered: result.totalEntered,
        growthRate,
      },
    };
  }, [data]);

  if (!data.length) return null;

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gray-50">
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary/5 via-transparent to-accent/5 -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT: Header & Stats */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-24 h-fit">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                Data & Fakta Akademik
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Pertumbuhan yang <span className="text-primary">Konsisten</span> & Terukur
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Transparansi data akademik sebagai bukti komitmen kami dalam menjaga kualitas pendidikan dan kepercayaan masyarakat luas.
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 pt-4">
              {/* Card 1: Mahasiswa Aktif */}
              <div className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Users className="w-20 h-20 text-primary" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-slate-500">Mahasiswa Aktif</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-4xl font-bold text-foreground">
                      {summary.totalActive.toLocaleString("id-ID")}
                    </h3>
                    {summary.growthRate !== 0 && (
                      <span className={`text-xs font-bold flex items-center px-2 py-1 rounded-full ${
                        summary.growthRate > 0 
                          ? "text-emerald-700 bg-emerald-50 border border-emerald-100" 
                          : "text-red-700 bg-red-50"
                      }`}>
                        {summary.growthRate > 0 ? "+" : ""}{summary.growthRate.toFixed(1)}%
                        <ArrowUpRight className="w-3 h-3 ml-0.5" />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 2: Total Alumni */}
              <div className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-accent/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <GraduationCap className="w-20 h-20 text-accent" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-slate-500">Total Alumni</span>
                  </div>
                  <h3 className="text-4xl font-bold text-foreground">
                    {summary.totalGraduates.toLocaleString("id-ID")}
                  </h3>
                </div>
              </div>

              {/* Card 3: Total Mahasiswa Terdaftar */}
              <div className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-purple-200 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <TrendingUp className="w-20 h-20 text-purple-500" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-slate-500">Total Mahasiswa Terdaftar</span>
                  </div>
                  <h3 className="text-4xl font-bold text-foreground">
                    {summary.totalEntered.toLocaleString("id-ID")}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Chart/Table */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              
              {/* Header with Toggle */}
              <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Data Penerimaan & Kelulusan
                  </h3>
                  <p className="text-sm text-muted-foreground">Per tahun akademik</p>
                </div>
                
                <div className="flex bg-slate-100/80 p-1 rounded-lg self-start sm:self-auto">
                  <button
                    onClick={() => setViewMode("chart")}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      viewMode === "chart"
                        ? "bg-white text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    Grafik
                  </button>
                  <button
                    onClick={() => setViewMode("table")}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      viewMode === "table"
                        ? "bg-white text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <TableIcon className="w-4 h-4" />
                    Data
                  </button>
                </div>
              </div>

              {/* Content Area - Fixed Height */}
              <div className="p-6 md:p-8">
                {viewMode === "chart" ? (
                  // Chart View
                  <div className="w-full">
                    <AreaChart width={800} height={400} data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} className="mx-auto max-w-full">
                      <defs>
                        <linearGradient id="colorMasuk" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorKeluar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#cbd5e1", strokeWidth: 1, strokeDasharray: "4 4" }} />
                      <Area type="monotone" dataKey="masuk" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorMasuk)" />
                      <Area type="monotone" dataKey="keluar" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorKeluar)" />
                    </AreaChart>
                    
                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="w-3 h-3 rounded-full bg-blue-500 ring-2 ring-blue-100" />
                        Mahasiswa Baru
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
                        Lulusan
                      </div>
                    </div>
                  </div>
                ) : (
                  // Table View
                  <div className="h-120 overflow-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
                        <tr>
                          <th className="px-3 sm:px-4 py-3 text-left rounded-l-lg whitespace-nowrap">Tahun</th>
                          <th className="px-3 sm:px-4 py-3 text-center text-blue-600 whitespace-nowrap">Mhs Baru</th>
                          <th className="px-3 sm:px-4 py-3 text-center text-emerald-600 whitespace-nowrap">Lulusan</th>
                          <th className="px-3 sm:px-4 py-3 text-center rounded-r-lg whitespace-nowrap">Total Aktif</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {chartData.map((row) => (
                          <tr key={row.year} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-3 sm:px-4 py-3 sm:py-4 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4 text-center text-slate-600 font-medium whitespace-nowrap">
                              {row.masuk.toLocaleString()}
                            </td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4 text-center text-slate-600 font-medium whitespace-nowrap">
                              {row.keluar.toLocaleString()}
                            </td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4 text-center font-bold text-slate-900 whitespace-nowrap">
                              {row.total.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}