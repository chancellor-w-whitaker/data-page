export const getColumnCount = ({ columns, width, media }) => {
  if (media.length === columns.length) {
    const lastBreakpoint = media[media.length - 1];

    const lastCount = columns[columns.length - 1];

    if (width >= lastBreakpoint) return lastCount;

    const breakpoints = media.slice(0, media.length - 1);

    for (let i = breakpoints.length - 1; i >= 0; i--) {
      const breakpoint = breakpoints[i];

      const count = columns[i + 1];

      if (width >= breakpoint) return count;
    }

    const firstCount = columns[0];

    return firstCount;
  }
};
