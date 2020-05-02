import { MetricData, ChartSeries } from 'model';

export const prepareWaterData = (data: MetricData[]): ChartSeries[] => {
  const water: ChartSeries[] = [{
    name: 'Холодная',
    data: []
  }, {
    name: 'Горячая',
    data: []
  }];

  for (const d of data) {
    const date = new Date(d.date).getTime();
    water[0].data.push([date, d.ch1]);
    water[1].data.push([date, d.ch0]);
  }

  return water;
};

export const prepareVoltData = (data: MetricData[]): ChartSeries[] => {
  const water: ChartSeries[] = [{
    name: 'V',
    data: []
  }];

  for (const d of data) {
    const date = new Date(d.date).getTime();
    water[0].data.push([date, d.voltage]);
  }

  return water;
};

export const currentDate = (d?: Date): string => {
  if (!d) {
    return '';
  }

  const date = new Date(d);

  const YY = date.getFullYear();
  let MM: string | number = date.getMonth() + 1;
  let DD: string | number = date.getDate();

  if (MM < 10) {
    MM = `0${MM}`;
  }

  if (DD < 10) {
    DD = `0${DD}`;
  }

  return `${DD}-${MM}-${YY}`;
};
