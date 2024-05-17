import { useCallback, useMemo } from "react";

export const useGridProps = (rows, columnFilter, nameFormatter) => {
  const sortableColumns = useMemo(() => {
    if (rows) {
      let columns = {};
      rows.forEach((object) => {
        columns = { ...columns, ...object };
      });
      return Object.keys(columns).filter(
        (key) => typeof columns[key] === "string"
      );
    }
    return [];
  }, [rows]);
  const getColumns = useCallback(() => {
    if (rows) {
      const formatHeader = (key) => {
        return key
          .split("_")
          .map((s) => s[0].toUpperCase() + s.substring(1).toLowerCase())
          .join(" ");
      };
      const formatNumber = (num) => {
        return num?.toLocaleString("en-US");
      };
      let columns = {};
      rows.forEach((object) => {
        columns = { ...columns, ...object };
      });
      const cols = Object.keys(columns).map((key) => {
        const typeOf = typeof columns[key];
        return {
          groupFormatter:
            typeOf === "number"
              ? ({
                  isCellSelected,
                  toggleGroup,
                  isExpanded,
                  childRows,
                  groupKey,
                  column,
                  row,
                }) =>
                  formatNumber(
                    childRows.reduce((prev, row) => prev + row[column.key], 0)
                  )
              : null,
          formatter:
            typeOf === "number"
              ? ({ isCellSelected, onRowChange, column, row }) =>
                  formatNumber(row[column.key])
              : null,
          sortable: sortableColumns.indexOf(key) !== -1,
          name: formatHeader(key),
          resizable: true,
          typeOf,
          key,
        };
      });
      cols.forEach((column) => {
        if (nameFormatter) {
          column.name = nameFormatter(column);
        }
      });
      return cols;
    }
    return [];
  }, [rows, sortableColumns, nameFormatter]);
  const columns = useMemo(
    () => (columnFilter ? getColumns().filter(columnFilter) : getColumns()),
    [getColumns, columnFilter]
  );

  return { columns, rows };
};
