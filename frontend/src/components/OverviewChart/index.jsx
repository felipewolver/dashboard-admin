/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line"

import { useGetSalesQuery } from "../../state/api";



const OverviewChart = ({ isDashboard = false, view }) => {
    
    const theme = useTheme();
    
    const { data, isLoading } = useGetSalesQuery(); //console.log(data);

    const [totalSalesLine, totalUnitsLine] = useMemo(() => {
        if(!data) return [];

        const { monthlyData } = data;

        const totalSalesLine = {
            id: 'totalSales',
            color: theme.palette.secondary.main,
            data: []
        }
        const totalUnitsLine = {
            id: 'totalUnits',
            color: theme.palette.secondary[600],
            data: []
        }

        Object.values(monthlyData).reduce((acc, { month, totalSales, totalUnits }) => {
            const curSales = acc.sales + totalSales;
            const curUnits = acc.units + totalUnits;
            
            totalSalesLine.data = [
                ...totalSalesLine.data,
                { x: month, y: curSales }
            ];

            totalUnitsLine.data = [
                ...totalUnitsLine.data,
                { x: month, y: curUnits }
            ];

            return {sales: curSales, units: curUnits};

        },  {sales: 0, units: 0} );

        return [[ totalSalesLine ], [totalUnitsLine]];
     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]); // desativanto depedências do hook useMemo com eslint-disable

    if(!data || isLoading) return "Loading...";

    return (
        <ResponsiveLine
            data={view === "sales" ? totalSalesLine : totalUnitsLine }
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: theme.palette.secondary[200]
                        }
                    },
                    legend: {
                        text: {
                            fill: theme.palette.secondary[200]
                        }
                    },
                    ticks: {
                        line: {
                            stroke: theme.palette.secondary[200],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: theme.palette.secondary[200]
                        }
                    }
                },
                legends: {
                    text: {
                        fill: theme.palette.secondary[200]
                    }  
                },
                tooltip: {
                    container: {
                        color: theme.palette.primary.main
                    }
                }
            }}
            margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', 
                stacked: false, 
                reverse: false, 
                min: "auto", 
                max: "auto" 
            }}
            yFormat=" >-.2f"
            curve="catmullRom" // vai ser exibido as linhas em forma de curva, por default eh linhas retas
            enableArea={isDashboard}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: (v) => {
                    // Vai executar essa função se a página eh dashboard
                    if(isDashboard) return v.slice(0, 3);

                    return v;
                },
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? "" : "Month",
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{ // aqui configura todo o designer do chart a esquerda
                orient: "left",
                tickValues: 5, // Vai exibir os valore em K no chart Ex 20k,40k. Neste ex com value 5 vai de 50k ateh 250k
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                format: '.2s',
                legend: isDashboard ? "" 
                    : `Total de ${view === "sales" ? "Lucro" : "Unidades"} Por ano`,
                legendOffset: -60,
                legendPosition: 'middle'
            }}
            enableGridX={false}
            enableGridY={false}
            lineWidth={1}
            pointSize={4}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={
                !isDashboard ? [ // se não for a page dashboard vai exibir esses dados senão undefined
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 30,
                    translateY: -40,
                    itemsSpacing: 2,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ] : undefined }
        />
    ); 

}


export default OverviewChart;