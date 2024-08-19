import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Box } from "@chakra-ui/react";
import CustomPieTooltip from "./CustomPieTooltip";

interface DataEntry {
  name: string;
  value: number;
}

const data: DataEntry[] = [
  { name: "0x3Af9E6986077D98d5cC492046460F8FCc629DF31", value: 300 },
  { name: "Group B", value: 280 },
  { name: "Group C", value: 120 },
  { name: "Group D", value: 70 },
  { name: "Group E", value: 60 },
  { name: "Group F", value: 30 },
  { name: "Group G", value: 20 },
  { name: "Group H", value: 10 },
];

const Colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HolderPieChart: React.FC = () => {
  return (
    <Box w="100%" h="100%">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={Colors[index % Colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomPieTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default HolderPieChart;
