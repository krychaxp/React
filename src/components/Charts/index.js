import React from "react";
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
import axios from 'axios'
export default () => {
    Exporting(Highcharts);
    (async function() {
        const {data} = await axios.get("http://cfg.krychaxp.pl/data.php?json=pm")
        Highcharts.chart('chart', {
            title: {
                text: 'Zanieczyszczenie powietrza w Poznaniu',
                style: {
                    fontSize: '25px'
                }
            },

            subtitle: {
                text: `Ostatnie ${data.length} zarejestrowanych pomiarów`
            },

            yAxis: {
                title: {
                    text: 'x µg/m<sup>3</sup>',
                    useHTML: true
                }
            },

            xAxis: [{
                categories: data.map((v, i) => `${v.date}<br>${v.time}`),
                crosshair: true
            }],

            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top',
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    }
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: '{value} µg/m<sup>3</sup>',
                useHTML: true
            },
            series: [{
                name: 'PM1',
                data: data.map(v => +v.pm1)
            }, {
                name: 'PM10',
                data: data.map(v => +v.pm10)
            }, {
                name: 'PM25',
                data: data.map(v => +v.pm25)
            }]
        });
    })();


    return (
        <div id="chart">
            charts
        </div>
    )
}