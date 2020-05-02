export const colors = ['#008FFB', '#FA4443'];

const options = {
  colors,
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '30%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    row: {
      colors: ['#fff', '#f2f2f2']
    }
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  fill: {
    opacity: 1
  },
  xaxis: {
    type: 'datetime',
    tickAmount: 6,
  },
  yaxis: {
    min: 0
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy'
    }
  },
};

export const voltOptions = {
  ...options,
  title: {
    text: 'Напряжение датчика',
    align: 'center',
    offsetY: 23
  },
  stroke: {
    curve: 'straight'
  },
  chart: {
    id: 'voltchart',
    toolbar: {
      show: false
    }
  },
};

export const waterOptions = {
  ...options,
  chart: {
    id: 'waterchart',
    toolbar: {
      show: true,
      tools: {
        download: false,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
      }
    }
  },
  title: {
    text: 'Исторические показатели',
    align: 'center',
    offsetY: 23
  },
  stroke: {
    curve: 'straight'
  },
};
