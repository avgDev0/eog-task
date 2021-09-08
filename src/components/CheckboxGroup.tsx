import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  List,
  IconButton,
  Button,
  Grid,
  Typography,
  withWidth,
  WithWidth,
  Collapse,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import { KeyboardArrowDownRounded as ExpandIcon, KeyboardArrowUpRounded as CollapseIcon } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearAll } from '../Features/MetricsSelector/metricsSlice';
import CheckboxItem from './CheckboxItem';

const useStyles = makeStyles((theme: Theme) => createStyles({
  metricsMenu: {
    maxHeight: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  collapseButton: {
    display: 'flex',
    justifyContent: 'space-between',
    textTransform: 'none',
  },
  card: {
    width: '100%',
  },
  cardHeader: {
    padding: '0 10px',
  },
  cardContent: {
    padding: 0,
    '&:last-child': {
      padding: 0,
    },
  },
  collapse: {
    width: '100%',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
  },
  clear: {
    width: '100%',
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

interface CheckboxListProps extends WithWidth {
  options: string[];
}

function CheckboxList(props: CheckboxListProps) {
  const classes = useStyles();
  const { options, width } = props;
  const { data } = useAppSelector((state) => state.metrics);
  const [menuOpen, setMenuOpen] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const content = (
    <>
      <Grid container>
        {width !== 'xs' && (
          <Grid className={classes.title} item md={6}>
            <Typography variant="h6">Select metrics</Typography>
          </Grid>
        )}
        {data.length > 1 && (
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              className={classes.clear}
              variant="outlined"
              color="primary"
              onClick={() => dispatch(clearAll())}
            >
              Clear selection
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <List disablePadding>
          {options.map((value) => (
            <CheckboxItem
              key={value}
              value={value}
              checked={data.some((m) => m.metricName === value)}
            />
          ))}
        </List>
      </Grid>
    </>
  );

  return (
    <Grid className={classes.metricsMenu} container>
      {width === 'xs' ? (
        <Card className={classes.card}>
          <CardHeader
            action={(
              <IconButton onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <CollapseIcon /> : <ExpandIcon />}
              </IconButton>
            )}
            title="Select Metrics"
          />
          <Collapse className={classes.collapse} in={menuOpen} unmountOnExit>
            <CardContent className={classes.cardContent}>{content}</CardContent>
          </Collapse>
        </Card>
      ) : (
        content
      )}
    </Grid>
  );
}

export default withWidth()(CheckboxList);
