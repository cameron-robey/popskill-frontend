// Modules
import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import styled from 'styled-components';

interface GraphData {
  data: {
    id: string,
    color: string,
    data: {
      x: number,
      y: number
    }[]
  }
}

const GraphWrapper = styled.div`
  height: 500px;
`;

const PlayerByGame: React.FC<GraphData> = ({ data }) => {

  useEffect(() => {
    console.log(Array.from({length: Math.round(data.data.length / 2)}, (_, i) => i * 2));
  }, []);

  const getYMaxMin = (data: {x:number, y:number}[]) => {
    const ticks = getYAxisTicks(data);

    return {
      max: Math.max(...ticks),
      min: Math.min(...ticks)
    }
  }

  const getXMaxMin = (data: {x:number, y:number}[]) => {
    const ticks = getXAxisTicks(data);

    return {
      max: Math.max(...ticks),
      min: Math.min(...ticks)
    }
  }

  const getYAxisTicks = (data: {x:number, y:number}[]) => {
    let max = Math.round(Math.max(...data.map(i=>i.y)) / 200) + 1;
    let min = Math.round(Math.min(...data.map(i=>i.y)) / 200) - 1;

    let length = (max - min) + 1;

    return Array.from({length: length}, (_, i) => (i + min) * 200);
  }

  const getXAxisTicks = (data: {x:number, y:number}[]) => {
    return Array.from({length: Math.round((data.length + 1) / 2)}, (_, i) => i * 2);
  }

  return <>
    <GraphWrapper>
  
      <ResponsiveLine
          data={[data]}
          margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
          xScale={{ type: 'linear', ...getXMaxMin(data.data)}}
          yScale={{ type: 'linear', stacked: true, ...getYMaxMin(data.data)}}
          yFormat=" >-.2f"
          curve="monotoneX"
          axisTop={null}
          axisRight={{
            tickValues: getYAxisTicks(data.data),
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 0
          }}
          axisBottom={{
            tickValues: getXAxisTicks(data.data),
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Games',
            legendOffset: 36,
            legendPosition: 'middle'
          }}
          axisLeft={{
            tickValues: getYAxisTicks(data.data),
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
          gridXValues={getXAxisTicks(data.data)}
          gridYValues={getYAxisTicks(data.data)}
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

export default PlayerByGame;