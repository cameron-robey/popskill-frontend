// Modules
import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import styled from 'styled-components';

interface GraphData {
  data: {
    id: string,
    data: {
      x: string,
      y: number
    }[]
  }[]
}

const GraphWrapper = styled.div`
  height: 500px;
`;

const PlayersByDate: React.FC<GraphData> = ({ data }) => {

  const getYMaxMin = (data: {x:string, y:number}[]) => {
    const ticks = getYTicks(data);

    return {
      max: Math.max(...ticks),
      min: Math.min(...ticks)
    }
  }

  const getYTicks = (data: {x:string, y:number}[]) => {
    let max = Math.round(Math.max(...data.map(i=>i.y)) / 200) + 1;
    let min = Math.round(Math.min(...data.map(i=>i.y)) / 200) - 1;

    let length = (max - min) + 1;

    return Array.from({length: length}, (_, i) => (i + min) * 200);
  }

  const getYAxisTicks = () => {
    let gmax = -1;
    let gmin = -1;

    data.forEach((g,i) => {
      const {max, min} = getYMaxMin(g.data);
      if (max > gmax) gmax = max;
      if (min < gmin || gmin === -1) gmin = min;
    });
    console.log(gmax, gmin)
    let length = ((gmax - gmin) / 200) + 1;
    console.log(data);
    return Array.from({length: length}, (_, i) => (i*200 + gmin));
  }

  useEffect(() => {
  }, []);

  return <>
    <GraphWrapper>
  
      <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
          xScale={{ format: "%Y-%m-%d", type: "time" }}
          yScale={{ type: 'linear', stacked: false, max: Math.max(...getYAxisTicks()), min: Math.min(...getYAxisTicks())}}
          xFormat="time:%Y-%m-%d"
          yFormat=" >-.2f"
          curve="monotoneX"
          axisTop={null}
          axisRight={{
            tickValues: getYAxisTicks(),
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 0
          }}
          axisBottom={{
            format: "%Y-%m-%d",
            legend: 'Games',
            legendOffset: 36,
            legendPosition: 'middle'
          }}
          axisLeft={{
            tickValues: getYAxisTicks(),
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Rating',
            legendOffset: -40,
            legendPosition: 'middle'
          }}
          colors={{ scheme: 'spectral' }}
          lineWidth={1}
          pointSize={4}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={1}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          gridYValues={getYAxisTicks()}
          legends={[
              {
                  anchor: 'right',
                  direction: 'column',
                  justify: false,
                  translateX: 140,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 12,
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
          ]}
      />
    </GraphWrapper> 
  </>
}

export default PlayersByDate;