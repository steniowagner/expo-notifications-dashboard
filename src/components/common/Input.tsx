import React, { memo } from 'react';
import { TextField } from '@material-ui/core';

interface Props {
  setValue: (value: string) => void;
  errorMessage: string;
  value: string;
  label: string;
  id: string;
}

const shouldComponentUpdate = (prevProps: Props, nextProps: Props) => {
  if (prevProps.value !== nextProps.value || prevProps.errorMessage !== nextProps.errorMessage) {
    return false;
  }

  return true;
};

const Input = ({ errorMessage, setValue, value, label, id }: Props) => (
  <TextField
    onChange={({ target }) => setValue(target.value)}
    variant="outlined"
    helperText={errorMessage}
    error={!!errorMessage}
    margin="normal"
    value={value}
    label={label}
    id={id}
  />
);

export default memo(Input, shouldComponentUpdate);
