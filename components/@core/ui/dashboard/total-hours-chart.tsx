'use client'

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts'

import { ChartConfig, ChartContainer } from '@/components/ui/chart'

const chartConfig = {
  hours: {
    label: 'Hours',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

type TotalHoursChartProps = {
  totalHours: number
  targetHours: number
}

export function TotalHoursChart({
  totalHours = 0,
  targetHours = 0,
}: TotalHoursChartProps) {
  const computedHours = (totalHours / targetHours) * 360

  const data = {
    hours: totalHours,
    fill: 'hsl(var(--chart-1))',
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="h-[150px] aspect-square border"
    >
      <RadialBarChart
        data={[data]}
        endAngle={100}
        innerRadius={56}
        outerRadius={116}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[62, 50]}
        />
        <RadialBar dataKey="hours" background />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-4xl font-bold"
                    >
                      {data.hours.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Hours
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  )
}
