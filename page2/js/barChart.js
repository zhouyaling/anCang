// 画区域柱形图
function BarChart(dataX, dataY, dataLegend, chartName) {
    option = {
        grid: {
            left: '5%',
            top: 60,
            bottom: 30,
            right: '15%',
        },
        tooltip: {
            trigger: 'axis',
        },

        legend: {
            type: 'scroll',
            right: '0',
            bottom: '50',
            orient: 'vertical',
            icon: "circle",
            textStyle: {
                color: '#8996DF' //字体颜色
            },
            data: dataLegend
        },
        xAxis: {
            data: dataY,
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
            z: 10
        },
        yAxis: {
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
                lineStyle: {
                    color: '#4560DC',
                    type: 'dashed'
                }
            }
        },
        /* dataZoom: [{
            type: 'inside'
        }], */
        series: [{
            type: 'bar',
            barWidth: 60, //柱图宽度
            itemStyle: {
                normal: {
                    //barBorderWidth: 60,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1, [
                            { offset: 0, color: '#425AFF' },
                            { offset: 1, color: '#004195' }
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1, [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' }
                        ]
                    )
                }
            },
            data: dataX
        }]
    };


    return option;
}

// 区域客流统计图
function BarChart2(dataX, dataY, chartName) {
    option = {
        /*  title: {
             text: chartName,
             x: 'left',
             textStyle: {
                 color: '#444444',
                 fontSize: 14
             }
         }, */
        color: ["#4864E6"],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        color: ["#4864E6"],
        grid: {
            left: '25',
            right: '5%',
            bottom: '3%',
            top: '12%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                textStyle: {
                    color: '#ffffff' //x轴字体的颜色
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'transparent' //设置 y 轴的颜色 第一条线
                }
            },
            splitLine: { // 水平线设置
                show: false,
                lineStyle: {
                    color: '#4560DC',
                    type: 'dashed'
                }
            }
        },
        yAxis: {
            type: 'category',
            max: 20,
            axisLabel: {
                textStyle: {
                    color: '#ffffff' //y轴字体的颜色
                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#666' //设置 y 轴的颜色 第一条线
                }
            },
            data: dataY
        },
        series: [{
            name: chartName,
            type: 'bar',
            itemStyle: {
                normal: {
                    barBorderWidth: 6,
                    color: new echarts.graphic.LinearGradient(
                        1, 0, 0, 0, [
                            { offset: 0, color: '#425AFF' },
                            { offset: 1, color: '#004195' }
                        ]
                    )
                }
            },
            data: dataX
        }]
    };

    return option;
}