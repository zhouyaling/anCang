// 折线图
function LineChart(xAxisData, seriesData, seriesData1) {
    var option = {
        color: ['#67A4FF', '#ed7d31'],
        legend: {
            data: ['授权用户', '预约用户']
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '8%',
            top: '10%',
            bottom: '25%',
            right: '3%'

        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            splitLine: { // 横坐标线
                show: false,
                lineStyle: {
                    color: '#ccc', //网格线颜色
                    width: 1, //网格线宽度
                    type: 'solid' //网格线样式
                }
            },
            axisLabel: { // 横坐标文本
                textStyle: {
                    color: "#999", //刻度线标签颜色,
                }
            },
            nameTextStyle: {
                backgroundColor: '#fff'
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#999', //左边线的颜色
                    width: '1', //坐标线的宽度
                }
            },
            axisTick: { // 刻度线
                show: false,
                inside: true,
                lineStyle: {
                    color: '#0B80C4',
                }
            },
            data: xAxisData
        }],
        yAxis: [{
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'transparent', //网格线颜色
                    width: 1, //网格线宽度
                    type: 'solid' //网格线样式
                },

            },
            splitArea: {
                show: true,
                areaStyle: { color: ['transparent'] },

            },
            axisLabel: {
                textStyle: {
                    color: "#999", //刻度线标签颜色,
                    fontSize: 12
                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    type: 'arrow',
                    color: '#A27D4F', //左边线的颜色
                    width: '2' //坐标线的宽度
                }
            },
            axisTick: {
                show: false,
            }
        }],
        series: [{
            name: '授权用户',
            type: 'line',
            data: seriesData,
            symbol: 'circle',
            itemStyle: {
                color: '#000000',
                normal: {
                    lineStyle: {
                        color: '#67A4FF'
                    }
                }
            }
        }, {
            name: '预约用户',
            type: 'line',
            data: seriesData1,
            symbol: 'square',
            itemStyle: {
                color: '#000000',
                normal: {
                    lineStyle: {
                        color: '#ed7d31'
                    }
                }
            }
        }]
    };

    return option;
}

// 曲线图
function LineChart1(legendData, dataX, dataY1, dataY2, dataY3) {
    option = {
        grid: {
            left: '10%',
            top: 60,
            bottom: 40,
            right: '8%',
        },
        tooltip: {
            trigger: 'axis',
        },

        legend: {
            right: '80',
            top: '0',
            icon: "circle",
            data: legendData,
            textStyle: {
                color: '#8996DF' //字体颜色
            },
        },
        color: ["#4DFFDE", "#425BFF", "#4C47E3"],
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                interval: 0,
                rotate: "45",
                textStyle: {
                    color: '#FFFFFF', //y轴字体的颜色
                    fontSize: '12px'
                },
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#4864E6' //设置 x 轴的颜色
                }
            },
            axisTick: { // 刻度线
                show: false
            },
            data: dataX
        }],
        yAxis: [{
            type: 'value',
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#666' //设置 y 轴的颜色
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#FFFFFF' //y轴字体的颜色
                },
                formatter: '{value}人'
            },
            axisTick: { // 刻度线
                show: false
            },
            splitLine: { // 水平线设置
                lineStyle: {
                    color: '#4560DC',
                    type: 'dashed'
                }
            }
        }],
        series: [{
                name: legendData[0],
                type: 'line',
                smooth: true, // 曲线
                symbol: "none", // 小圆点
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: 'transparent'
                        }
                    }
                },
                areaStyle: {
                    normal: {
                        // color: 'rgba(120, 239, 215, 0.56)',
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [
                                { offset: 1, color: 'rgba(120,239,215,0.1)' },
                                { offset: 0, color: 'rgba(120,239,215,0.92)' }
                            ]
                        )
                    }
                },
                data: dataY1
            },
            {
                name: legendData[1],
                type: 'line',
                smooth: true, // 曲线
                symbol: "none", // 小圆点
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: 'transparent'
                        }
                    }
                },
                areaStyle: {
                    normal: {
                        //color: 'rgba(66,91,255,0.5)',
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [
                                { offset: 1, color: 'rgba(66,91,255,0.1)' },
                                { offset: 0, color: 'rgba(66,91,255,0.92)' }
                            ]
                        )
                    }
                },
                data: dataY2
            }, {
                name: legendData[2],
                type: 'line',
                smooth: true, // 曲线
                symbol: "none", // 小圆点
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: 'transparent'
                        }
                    }
                },
                areaStyle: {
                    normal: {
                        //color: 'rgba(76,71,227,0.5)'
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [
                                { offset: 1, color: 'rgba(76,71,227,0.1)' },
                                { offset: 0, color: 'rgba(76,71,227,0.92)' }
                            ]
                        )
                    }
                },
                data: dataY3
            }
        ]
    };

    return option;
}

// 曲线图2
function LineChart2(legendData, dataX, dataY1) {
    option = {
        grid: {
            left: '8%',
            top: 30,
            bottom: 30,
            right: '6%',
        },
        tooltip: {
            trigger: 'axis',
        },
        color: ["rgba(72,100,230,0.2)"],
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#FFFFFF', //y轴字体的颜色
                    fontSize: '12px'
                },
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#4864E6' //设置 x 轴的颜色
                }
            },
            axisTick: { // 刻度线
                show: false
            },
            data: dataX
        }],
        yAxis: [{
            type: 'value',
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#666' //设置 y 轴的颜色
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#FFFFFF' //y轴字体的颜色
                },
                formatter: '{value}辆'
            },
            axisTick: { // 刻度线
                show: false
            },
            splitLine: { // 水平线设置
                lineStyle: {
                    color: '#4560DC',
                    type: 'dashed'
                }
            }
        }],
        series: [{
            name: legendData[0],
            type: 'line',
            smooth: true, // 曲线
            symbol: "none",
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: 'transparent'
                    }
                }
            },
            areaStyle: {
                normal: {
                    // color: 'rgba(72,100,230,0.5)' 
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1, [
                            { offset: 1, color: 'rgba(66,90,255,0.1)' },
                            { offset: 0.7, color: 'rgba(66,90,255,0.7)' },
                            { offset: 0, color: 'rgba(66,90,255,1)' }
                        ]
                    )
                }
            },
            data: dataY1
        }]
    };

    return option;
}

// 区域客流统计曲线图
function LineChart3(dataX, dataY, chartName) {
    option = {
        grid: {
            left: '10%',
            top: 30,
            bottom: 30,
            right: '8%',
        },
        tooltip: {
            trigger: 'axis',
        },
        color: ["#4DFFDE"],
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#FFFFFF', //y轴字体的颜色
                    fontSize: '12px'
                },
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#4864E6' //设置 x 轴的颜色
                }
            },
            axisTick: { // 刻度线
                show: false
            },
            data: dataX
        }],
        yAxis: [{
            type: 'value',
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#4864E6' //设置 y 轴的颜色
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#FFFFFF' //y轴字体的颜色
                },
                formatter: '{value}'
            },
            axisTick: { // 刻度线
                show: false
            },
            splitLine: { // 水平线设置
                show: false,
                lineStyle: {
                    color: '#4560DC',
                    type: 'dashed'
                }
            }
        }],
        series: [{
            name: chartName,
            type: 'line',
            smooth: true, // 曲线
            symbol: "none", // 小圆点
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: 'transparent'
                    }
                }
            },
            areaStyle: {
                normal: {
                    // color: 'rgba(120, 239, 215, 0.56)',
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1, [
                            { offset: 1, color: 'rgba(77,72,230,0.1)' },
                            { offset: 0.7, color: 'rgba(77,72,230,0.6)' },
                            { offset: 0, color: 'rgba(77,72,230,1)' }
                        ]
                    )
                }
            },
            data: dataY
        }]
    };

    return option;
}