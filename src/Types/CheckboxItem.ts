interface IWithDataProps {
  value: string;
  checked: boolean;
}

interface CheckboxItemProps extends IWithDataProps {
  onSelect: Function;
}

export type { IWithDataProps, CheckboxItemProps };
