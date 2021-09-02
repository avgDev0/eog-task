interface IWithDataProps {
  value: string;
  checked: boolean;
}

interface CheckboxItemProps extends IWithDataProps {
  onSelect: Function;
}

type Measurements = {
  value: number;
  unit: string;
  at: number;
};

export type { IWithDataProps, CheckboxItemProps, Measurements };
