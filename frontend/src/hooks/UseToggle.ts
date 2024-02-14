import { useState } from 'react';

export const UseToggle = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  return { toggle, open };
};
