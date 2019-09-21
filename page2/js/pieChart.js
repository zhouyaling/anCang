// 饼图1
function PieChart1(dataLegend, dataSeries, pieName) {
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b} {d}%"
        },
        grid: {
            left: '-10',
        },
        legend: {
            right: '10',
            bottom: '50',
            orient: 'vertical',
            icon: "circle",
            data: dataLegend,
            textStyle: {
                // fontSize: 18, //字体大小
                color: '#8996DF' //字体颜色
            },
        },
        color: ["#43DBAE", "#4864E6", "#48A7E6"],
        series: [{
            name: pieName,
            type: 'pie',
            radius: [15, 80],
            center: ['40%', '45%'],
            roseType: 'area',
            data: dataSeries,
            label: {
                normal: {
                    show: true,
                    formatter: "{c}人   {d}%"
                },
            }
        }]
    };

    return option;
}

// 饼图2
function PieChart2(dataLegend, dataSeries, dataColor, chartName) {
    option = {
        /*  title: {
             text: chartName,
             x: 'left',
             textStyle: {
                 color: '#444444',
                 fontSize: 14
             }
         }, */
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        /* legend: {
            type: 'scroll',
            right: '30',
            bottom: '50',
            orient: 'vertical',
            icon: "circle",
            textStyle: {
                // fontSize: 18, //字体大小
                color: '#8996DF' //字体颜色
            },
            data: dataLegend,
             formatter: function(name) {
                 var qq = dataSeries;
                 var total = 0;
                 var target = 0;
                 for (var q = 0; q < dataSeries.length; q++) {
                     total += dataSeries[q].value;
                     if (dataSeries[q].name == name) {
                         target = dataSeries[q].value;
                     }
                 }

                 return name + "\x20" + parseFloat(target / total).toFixed(2) * 100 + "%";
             }
        }, */
        color: dataColor,
        series: [{
            name: '来访次数比例',
            type: 'pie',
            radius: ['55%', '70%'],
            center: ['40%', '45%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: '20',
                        // fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: dataSeries
        }]
    };
    return option;
}

// 饼图3
function PieChart3(dataLegend, dataSeries, dataColor, chartName) {
    option = {
        title: {
            text: chartName,
            textStyle: {
                color: '#444444',
                fontSize: 14
            },
            x: 'left'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            y: "bottom",
            icon: "circle",
            data: dataLegend
        },
        color: dataColor,
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['0', '70%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: "{d}%"
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: dataSeries
        }]
    };
    return option;
}

// 饼图
function PieChart(data, chartName) {
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ["#209aff", "#ed7d31", "#a5a5a5", "#70ad47", ],
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: '10%',
            top: 40,
            bottom: 20,
            data: data.legendData
        },
        series: [{
            name: chartName,
            type: 'pie',
            radius: '75%',
            center: ['40%', '40%'],
            data: data.seriesData,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                },
            }
        }]
    };

    return option;
}

// 地图
function MapChart(seriesData) {
    option = {
        tooltip: {
            trigger: 'item'
        },
        series: [{
            name: '省份',
            type: 'map',
            mapType: 'china',
            zoom: 1.2,
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 12,
                        color: 'transparent'
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#11629A', //地图本身的颜色 11629A
                    borderColor: '#209aff', //省份的边框颜色 3CB4CF
                    borderWidth: 1, //省份的边框宽度
                    opacity: 0.8, //图形透明度
                },
                emphasis: { //高亮状态
                    areaColor: '#209aff', //高亮时候地图显示的颜色
                    borderWidth: 0 //高亮时候的边框宽度
                },

            },
            data: seriesData
        }]
    };
    return option;
}

// 性别饼图
function PieChart5(dataLegend, dataSeries, dataColor, chartName) {
    option = {
        /*  title: {
             text: chartName,
             x: 'left',
             textStyle: {
                 color: '#444444',
                 fontSize: 14
             }
         }, */
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            y: "bottom",
            icon: "circle",
            textStyle: {
                // fontSize: 18, //字体大小
                color: '#8996DF' //字体颜色
            },
            data: dataLegend
        },
        color: dataColor,
        series: [{
            name: '性别',
            type: 'pie',
            radius: ['55%', '70%'],
            center: ['50%', '45%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: '20',
                        // fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: dataSeries
        }]
    };
    return option;
}

// 加载蜘蛛网图
function RanderChart(indicatorData, dataV, chartName) {
    option = {
        tooltip: {},
        radar: {
            name: {
                textStyle: {
                    color: '#ffffff',
                    backgroundColor: '#141B39',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: indicatorData,
            splitArea: {
                areaStyle: {
                    color: ['rgba(29,42,95, 0.2)',
                        'rgba(29,42,95, 0.4)', 'rgba(29,42,95, 0.6)',
                        'rgba(29,42,95, 0.8)', 'rgba(29,42,95, 1)'
                    ],
                    /*   shadowColor: 'rgba(0, 0, 0, 0.3)',
                      shadowBlur: 10 */
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#364CAC'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#364CAC'
                }
            },
        },
        series: [{
            name: chartName,
            type: 'radar',
            symbol: "none", // 小圆点
            itemStyle: {
                normal: { color: "#484AE6" }
            },
            areaStyle: {
                opacity: 1,
                normal: {
                    color: '#484AE6'
                }
            },
            data: [{
                value: dataV,
                name: chartName
            }]
        }]
    };
    return option;
}

// 加载来访车辆类型蜘蛛网图
function RanderChart1(indicatorData, dataV, chartName) {
    option = {
        tooltip: {},
        radar: {
            name: {
                textStyle: {
                    color: '#ffffff',
                    backgroundColor: '#141B39',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: indicatorData,
            splitArea: {
                areaStyle: {
                    color: ['rgba(29,42,95, 0.2)',
                        'rgba(29,42,95, 0.4)', 'rgba(29,42,95, 0.6)',
                        'rgba(29,42,95, 0.8)', 'rgba(29,42,95, 1)'
                    ],
                    /*   shadowColor: 'rgba(0, 0, 0, 0.3)',
                      shadowBlur: 10 */
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#364CAC'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#364CAC'
                }
            },
        },
        series: [{
            name: chartName,
            type: 'radar',
            symbol: "none", // 小圆点
            itemStyle: {
                normal: { color: "#484AE6" }
            },
            areaStyle: {
                opacity: 1,
                normal: {
                    color: '#484AE6'
                }
            },
            data: [{
                value: dataV,
                name: chartName
            }]
        }]
    };
    return option;
}