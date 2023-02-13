import { BarChart, Bar, YAxis, XAxis, ResponsiveContainer } from "recharts";

export default function CardAnalysis({
  data,
}: {
  data: { name: string; amount: number }[];
}) {
  const width = data.reduce(
    (max, cur) => (cur.name.length > max ? cur.name.length : max),
    -1
  );

  return (
    <ResponsiveContainer width="100%" height={data.length * 30}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" />
        <YAxis width={width * 7.5} type="category" dataKey="name" />
        <Bar dataKey="amount" fill="#8884d8" label={{ fill: "black" }} />
      </BarChart>
    </ResponsiveContainer>
  );
}
