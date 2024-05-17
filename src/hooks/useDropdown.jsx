import { useDeferredValue, useState } from "react";

export const useDropdown = ({
  orderMatters = true,
  formatter,
  initial,
  title,
  list,
}) => {
  const [active, setActive] = useState([]);
  const deferredActive = useDeferredValue(active);

  return [
    {
      orderMatters,
      formatter,
      setActive,
      initial,
      active,
      title,
      list,
    },
    deferredActive,
  ];
};
