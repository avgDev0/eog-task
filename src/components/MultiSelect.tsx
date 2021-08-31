import React, { useState } from 'react';
import {
  Select,
  Container,
  Chip,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useAppSelector } from '../redux/hooks';

type MultiSelectorProps = {
  options: string[];
};

// type ChipData = {
//   key: string;
//   label: string;
// };

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

function MultiSelector(props: MultiSelectorProps) {
  const { options } = props;
  const [selected, setSelected] = useState<string[]>([]);
  const classes = useStyles();

  const metrics = useAppSelector(state => state.metrics);
  console.log({ metrics });

  const getOptionsToDisplay: () => string[] = () => options.reduce((acc, option) => {
    if (!selected.includes(option)) {
      acc.push(option);
    }

    return acc;
  }, [] as string[]);

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const { target: { value } } = e;

    setSelected(value as string[]);
  };

  const handleOnDelete = (value: string) => {
    setSelected(selected.filter((selectedOption: string) => selectedOption !== value));
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
