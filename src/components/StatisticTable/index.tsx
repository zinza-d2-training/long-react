import {
  colors,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Box } from '@mui/system';
import { PercentageBar } from 'components';
import { IOptionsTable, ITableData } from 'models';
import { Waypoint } from 'react-waypoint';

interface IProps {
  data: ITableData;
  options?: IOptionsTable;
  onLoadMoreData?: () => void;
}

export const StatisticTable = (props: IProps) => {
  const {
    data: { heading, dataSet },
    options = {},
    onLoadMoreData
  } = props;
  return (
    <Box>
      <TableContainer
        sx={{
          minHeight: options.minHeight ? options.minHeight : 'unset',
          maxHeight: options.maxHeight ? options.maxHeight : 'unset'
        }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {heading.map((label, index) => (
                <TableCell key={label + index} align="center">
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSet.map((row, rowIndex) => (
              <TableRow
                key={'' + row[1]?.toString() + row[2]?.toString() + rowIndex}
                sx={
                  rowIndex % 2 === 0
                    ? { backgroundColor: colors.grey[100] }
                    : {}
                }>
                {row.map((data, cellIndex) => {
                  if (options.percentColumns) {
                    const { percentColumns } = options;
                    const configColumn = percentColumns.find(
                      (column) => column.number === cellIndex
                    );
                    if (configColumn) {
                      return (
                        <TableCell
                          sx={{ py: 1 }}
                          key={'' + data + cellIndex}
                          align="center">
                          {cellIndex === 0 && rowIndex === dataSet.length - 1 && (
                            <Waypoint
                              onEnter={
                                options.hasLoadMore ? onLoadMoreData : () => {}
                              }>
                              <div
                                style={{
                                  width: '3px',
                                  height: '3px',
                                  backgroundColor: '#f00'
                                }}></div>
                            </Waypoint>
                          )}
                          <Box
                            sx={{
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'center'
                            }}>
                            <PercentageBar
                              number={Number(data)}
                              color={configColumn.color}
                            />
                          </Box>
                        </TableCell>
                      );
                    }
                  }
                  return (
                    <TableCell
                      sx={{ py: 1 }}
                      key={'' + data + cellIndex}
                      align="center">
                      {cellIndex === 0 && rowIndex === dataSet.length - 1 && (
                        <Waypoint
                          onEnter={
                            options.hasLoadMore ? onLoadMoreData : () => {}
                          }>
                          <div></div>
                        </Waypoint>
                      )}
                      {data?.toLocaleString()}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
