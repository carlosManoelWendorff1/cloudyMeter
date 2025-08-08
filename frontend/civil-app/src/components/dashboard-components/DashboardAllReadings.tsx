import { Line } from '@ant-design/plots';
import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReadingService from '../../services/ReadingService';
import Readings from '../../models/Readings';
import { json } from 'stream/consumers';

interface RegisterDevicePagePropsProps {
  readings: Readings[];
}

const DashboardAllReadings: React.FC<RegisterDevicePagePropsProps> = ({ readings }) => {

  const config = {
    data: {
      value: readings,
    },
    xField: 'time',
    yField: 'value',
    scale: { color: { range: ['#30BF78', '#F4664A', '#FAAD14', '#27A0CB'] } },
    seriesField: 'type',
    colorField: 'type',
    axis: {
      x: {
        labelFormatter: (d: any) => new Date(d).toLocaleDateString()   + " " + new Date(d).toLocaleTimeString() ,
      },
    },
    slider: {
      x: { labelFormatter:  (d: any) => new Date(d).toLocaleDateString() + " " + new Date(d).toLocaleTimeString() },
      y: { labelFormatter: '~s' },
    },
    style: {
      lineWidth: 2,
    }
  };
    
  return <Line {...config} />;
}

export default DashboardAllReadings
