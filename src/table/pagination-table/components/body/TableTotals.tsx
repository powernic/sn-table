import TableRow from "@mui/material/TableRow";
import React, { memo } from "react";

import CellText from "../../../components/CellText";
import { TableContext, useContextSelector } from "../../../context";
import { removeTabAndFocusCell } from "../../../utils/accessibility-utils";
import { handleTotalKeyDown } from "../../../utils/handle-keyboard";
import { StyledTotalsCell } from "./styles";
import {CellStyle} from "../../../../table/types";
import {getColumnStyle, getTotalColumnStyle} from "../../../utils/styling-utils";
const TableTotals = () => {
  const {
    columns,
    totalsPosition: { atTop },
    rows,
  } = useContextSelector(TableContext, (value) => value.tableData);
  const { rootElement, selectionsAPI, keyboard, styling, interactions } = useContextSelector(
    TableContext,
    (value) => value.baseProps,
  );
  const headRowHeight = useContextSelector(TableContext, (value) => value.headRowHeight);
  const setFocusedCellCoord = useContextSelector(TableContext, (value) => value.setFocusedCellCoord);
  const isNewHeadCellMenuEnabled = useContextSelector(
    TableContext,
    (value) => value.featureFlags.isNewHeadCellMenuEnabled,
  );

  return (
    <TableRow className="sn-table-row sn-table-totals-row">
      {columns.map((column, columnIndex) => {
        const cellCoord: [number, number] = [atTop ? 1 : rows.length + 1, columnIndex];
        const tabIndex = atTop && columnIndex === 0 && !keyboard.enabled ? 0 : -1;
        const style = column.stylingIDs.length ? getTotalColumnStyle(styling as CellStyle, rows[0]['col-'+columnIndex].qAttrExps, column.stylingIDs) : null;
        const background = style?.background || undefined;
        const color = style?.color || undefined;
        return (
          <StyledTotalsCell
            totalsStyle={styling.totals}
            headRowHeight={headRowHeight}
            background={background}
            color={color}
            atTop={atTop}
            key={column.id}
            align={column.totalsTextAlign}
            className="sn-table-cell"
            tabIndex={isNewHeadCellMenuEnabled ? -1 : tabIndex}
            title={interactions.passive ? column.totalInfo : undefined}
            onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
              handleTotalKeyDown(
                e,
                rootElement,
                cellCoord,
                setFocusedCellCoord,
                isNewHeadCellMenuEnabled,
                selectionsAPI?.isModal(),
              );
            }}
            onMouseDown={() => {
              removeTabAndFocusCell(cellCoord, rootElement, setFocusedCellCoord, keyboard);
            }}
          >
            <CellText fontSize={styling.totals.fontSize}>{column.totalInfo}</CellText>
          </StyledTotalsCell>
        );
      })}
    </TableRow>
  );
};

export default memo(TableTotals);
