"use client"
import React from "react";
import { AxisOptions, Chart } from "react-charts";
import ResizableBox from "@/app/ResizableBox";
import useDemoConfig  from "@/app/useDemoConfig";

export default function Bar({title: string}) {
    const { data, randomizeData } = useDemoConfig({
        series: 1,
        dataType: "ordinal",
    });

    const primaryAxis = React.useMemo<
        AxisOptions<typeof data[number]["data"][number]>
    >(
        () => ({
            getValue: (datum) => datum.primary,
        }),
        []
    );

    const secondaryAxes = React.useMemo<
        AxisOptions<typeof data[number]["data"][number]>[]
    >(
        () => [
            {
                getValue: (datum) => datum.secondary,
            },
        ],
        []
    );

    return (
        <>
            <ResizableBox>
                {/*<h2>{title}</h2>*/}
                <Chart
                    options={{
                        data,
                        primaryAxis,
                        secondaryAxes,
                    }}
                />
            </ResizableBox>
        </>
    );
}
