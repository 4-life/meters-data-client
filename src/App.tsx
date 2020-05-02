import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Container, Box, Card, CardContent, Typography, makeStyles, LinearProgress } from '@material-ui/core';
import { MetricData, ChartSeries } from 'model';
import { colors, waterOptions, voltOptions } from 'options';
import { prepareWaterData, prepareVoltData, currentDate } from 'utils';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  colorHot: {
    color: colors[1],
  },
  colorCold: {
    color: colors[0],
  },
});

function App() {
  const classes = useStyles();
  const [waterData, setWaterData] = useState<ChartSeries[]>([]);
  const [voltData, setVoltData] = useState<ChartSeries[]>([]);
  const [latestWaterData, setLatestWaterData] = useState<MetricData>();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('//test.4life.work/api/v1/metrics')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          const water = prepareWaterData(result.data);
          const volt = prepareVoltData(result.data);
          setWaterData(water);
          setVoltData(volt);

          setLatestWaterData(result.data[result.data.length - 1]);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  return (
    <>
      { !isLoaded && <LinearProgress /> }
      <Container>
        { error && <Typography>{ error }</Typography> }
        <Box mt={ 5 } mb={ 1 }>
          <Typography color="textSecondary">
            Показания на { currentDate(latestWaterData?.date) }
          </Typography>
        </Box>
        <Box display="flex">
          <Box width={ 200 }>
            <Card className={ classes.card }>
              <CardContent>
                <Typography variant="h3" color="primary" className={ classes.colorCold }>
                  { latestWaterData?.ch1 || 0 }
                </Typography>
                <Typography color="textSecondary">
                  Холодная
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box width={ 200 } ml={ 2 }>
            <Card className={ classes.card }>
              <CardContent>
                <Typography variant="h3" className={ classes.colorHot }>
                  { latestWaterData?.ch0 || 0 }
                </Typography>
                <Typography color="textSecondary">
                  Горячая
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
        <Box display="flex" mt={ 10 } flexWrap="wrap">
          <Box width={ 1 / 2 } minWidth={ 300 }>
            <Chart options={ waterOptions } series={ waterData } type="bar" height={ 250 } />
          </Box>
          <Box width={ 1 / 2 } minWidth={ 300 }>
            <Chart options={ voltOptions } series={ voltData } type="area" height={ 250 } />
          </Box>
        </Box>
        <Card className={ classes.card }>
          <CardContent>
            <Typography color="textSecondary">
              Version: { latestWaterData?.version || 0 }
            </Typography>
            <Typography color="textSecondary">
              Impulse: [{ latestWaterData?.imp0 || 0 }, { latestWaterData?.imp1 || 0 }]
            </Typography>
            <Typography color="textSecondary">
              Delta: [{ latestWaterData?.delta0 || 0 }, { latestWaterData?.delta1 || 0 }]
            </Typography>
            <Typography color="textSecondary">
              rssi: { latestWaterData?.rssi || 0 }
            </Typography>
            <Typography color="textSecondary">
              Resets: { latestWaterData?.resets || 0 }
            </Typography>
            <Typography color="textSecondary">
              Voltage diff: { latestWaterData?.voltage_diff || 0 }
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default App;
