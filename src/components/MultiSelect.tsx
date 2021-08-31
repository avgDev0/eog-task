import React from 'react';
import {
  Select,
  Container,
  Chip,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setSelected } from '../Features/MetricsSelector/metricsSlice';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flexStart',
  },
  selectedContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  selectedOption: {
    margin: 2,
  },
});

function MultiSelector() {
  const classes = useStyles();
  const { available, selected } = useAppSelector(state => state.metrics);
  const dispatch = useAppDispatch();

  const getOptionsToDisplay: () => string[] = () => available.reduce((acc, metric) => {
    if (!selected.includes(metric)) {
      acc.push(metric);
    }

    return acc;
  }, [] as string[]);

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const { target: { value } } = e;

    dispatch(setSelected(value as string[]));
  };

  const handleOnDelete = (value: string) => {
    dispatch(setSelected(selected.filter((selectedOption: string) => selectedOption !== value)));
  };

  return (
    <Container className={classes.container}>
      <Select
        id="multi-select"
        multiple
        value={selected}
        onChange={handleChange}
        renderValue={(values) => (
          <div className={classes.selectedContainer}>
            {(values as string[]).map((value) => (
              <Chip
                key={value}
                label={value}
                className={classes.selectedOption}
                onDelete={() => handleOnDelete(value)}
                onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
              />
            ))}
          </div>
        )}
      >
        {getOptionsToDisplay().map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </Container>
  );
}

export default MultiSelector;
