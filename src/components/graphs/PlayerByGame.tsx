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
      y: number,
      matchID: string
    }[]
  }
}

const GraphWrapper = styled.div`
  height: 500px;
`;

const ToolTip = styled.div`
  background: white none repeat scroll 0% 0%;
  color: inherit;
  font-size: inherit;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 2px;
  padding: 5px 9px;
`;

const ToolTipWrapper = styled.div`
  white-space: pre;
  display: flex;
  align-items: left;
  flex-direction: column;
  /* justify-content: left; */
`;

const ColorBlock = styled.span<{color: string}>`
  display: inline-block;
  width: 12px;
  height: 12px;
  background: ${({color}) => color} none repeat scroll 0% 0%;
  margin-right: 7px;
`;

const PlayerByGame: React.FC<GraphData> = ({ data }) => {

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

          tooltip={(input: any) => {
            const data = input.point as {
              borderColor: string,
              color: string,
              data: {
                matchID: number,
                matchDetails: Match,
                userID: string,
                x: number,
                xFormatted: number,
                y: number,
                yFormatted: string,
                yStacked: number
              },
              id: string,
              index: number,
              serieColor: string,
              serieId: string
            }

            // Tooltip for first game

            if (data.data.matchID === 0) {
              return <>
              <ToolTip>
                <ToolTipWrapper>
                  <span><ColorBlock color={input.point.borderColor} /><strong>Initial rating: </strong>{data.data.y}</span>
                </ToolTipWrapper>
              </ToolTip>
            </>
            }

            // Show loading if loading data

            if (data.data.matchDetails === undefined) {
              return <>
                <ToolTip>
                  <ToolTipWrapper>
                    <span><ColorBlock color={input.point.borderColor} /><strong>Match ID: </strong>{data.data.matchID}</span>
                    <span><strong>Loading match data</strong></span>
                  </ToolTipWrapper>
                </ToolTip>
              </>
            }

            // Work out whether winning team or not
            let friendlyScore, friendly, enemyScore, enemy;
            if (data.data.userID in data.data.matchDetails.team1table) {
              // Part of team 1
              friendlyScore = data.data.matchDetails.team1score;
              friendly = data.data.matchDetails.team1table;
              enemyScore = data.data.matchDetails.team2score;
              enemy = data.data.matchDetails.team2table;
            } else {
              // assume part of team 2
              friendlyScore = data.data.matchDetails.team2score;
              friendly = data.data.matchDetails.team2table;
              enemyScore = data.data.matchDetails.team1score;
              enemy = data.data.matchDetails.team1table;
            }

            return <>
              <ToolTip>
                <ToolTipWrapper>
                  <span><ColorBlock color={input.point.borderColor} /><strong>Match ID: </strong>{data.data.matchID}</span>
                  <span>
                    {(friendlyScore > enemyScore ? "Won" : friendlyScore < enemyScore ? "Lost" : "Tie")}:
                    <strong> {friendlyScore} - {enemyScore}</strong>
                  </span>
                </ToolTipWrapper>
              </ToolTip>
            </>
          }
        }
      />
    </GraphWrapper> 
  </>
}

export default PlayerByGame;

    
    