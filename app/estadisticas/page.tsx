"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Ene", usuarios: 4000, ingresos: 2400 },
  { name: "Feb", usuarios: 3000, ingresos: 1398 },
  { name: "Mar", usuarios: 2000, ingresos: 9800 },
  { name: "Abr", usuarios: 2780, ingresos: 3908 },
  { name: "May", usuarios: 1890, ingresos: 4800 },
  { name: "Jun", usuarios: 2390, ingresos: 3800 },
];

export default function EstadisticasPage() {
  return (
    <div className="p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-purple-600 dark:text-purple-300">
              Usuarios Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="usuarios" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-indigo-600 dark:text-indigo-300">
              Ingresos Mensuales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ingresos" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
