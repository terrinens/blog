"use client"

import {useEffect, useMemo, useRef} from "react";
import ApexCharts from "apexcharts";
import {ChartDataProps} from "@/app/components/main_frame/LanguageBlockData";
import {DataTable} from "simple-datatables";


function chartOption(chartData: ChartDataProps) {
    const bytes = chartData.bytes;
    const lang = chartData.lang;
    const colors = chartData.colors;

    const numberFormat = Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });

    return {
        series: bytes,
        labels: lang,
        colors: colors,
        chart: {
            height: 320,
            width: "100%",
            type: "donut",
        },
        stroke: {
            colors: ["transparent"],
            lineCap: "",
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                            offsetY: 20,
                        },
                        total: {
                            showAlways: true,
                            show: true,
                            label: "작성 코드 총합",
                            fontFamily: "Inter, sans-serif",
                            formatter: function (w: { globals: { seriesTotals: any[]; }; }) {
                                const sum = w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0)
                                return `${numberFormat.format(parseFloat((sum / 1024).toFixed(2)))} KB`
                            },
                        },
                        value: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                            offsetY: -20,
                            formatter: function (value: string) {
                                return value + " Byte"
                            },
                        },
                    },
                    size: "80%",
                },
            },
        },
        grid: {
            padding: {
                top: -2,
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            position: "bottom",
            fontFamily: "Inter, sans-serif",
        },
        yaxis: {
            labels: {
                formatter: function (value: string) {
                    return value + " Byte"
                },
            },
        },
        xaxis: {
            labels: {
                formatter: function (value: string) {
                    return value + " Byte"
                },
            },
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
        },
    }
}

function CodeByteGraph({chartData}: { chartData: ChartDataProps }) {
    const chartRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (chartRef.current) {
            const chart = new ApexCharts(chartRef.current, chartOption(chartData));
            chart.render();

            return () => {chart.destroy();};
        }
    }, [chartData]);

    return (
        <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
            <div className="flex justify-center mb-3">
                <div className="flex justify-center items-center">
                    <h5 className="text-center text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
                        전체 작성 코드 Bytes
                    </h5>
                </div>
            </div>
            <div className="py-6" ref={chartRef}></div>
        </div>
    )
}

function CodeByteTable({chartData}: { chartData: ChartDataProps }) {
    const tableRef = useRef<HTMLTableElement | null>(null);

    const data: { headings: string[], data: (string | number)[][] } = useMemo(() => {
        return {
            headings: ['언어', 'Bytes'],
            data: chartData.lang.map((lan, index) =>
                [lan, chartData.bytes[index]]
            )
        }
    }, [chartData.lang, chartData.bytes])

    const option = useMemo(() =>
        ({searchable: true, sortable: true, data: data}), [data])

    useEffect(() => {
        if (tableRef.current) {
            new DataTable("#search-table", option);
        }
    }, [option]);

    return (<table ref={tableRef} id="search-table"></table>)
}

export default function LanguageBlock({chartData}: { chartData: ChartDataProps }) {
    return (
        <div className="container mx-auto w-full">
            <div className='grid grid-cols-2 gap-1'>
                <div className='col-span-1 p-4'>
                    <CodeByteGraph chartData={chartData}/>
                </div>
                <div className='col-span-1 p-4'>
                    <CodeByteTable chartData={chartData}/>
                </div>
            </div>
        </div>
    )
}