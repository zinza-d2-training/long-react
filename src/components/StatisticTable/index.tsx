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
import PercentageBar from 'components/PercentageBar';
import { IOptionsTable, ITableData } from 'models';

interface IProps {
  data: ITableData;
  options?: IOptionsTable;
}

const StatisticTable = (props: IProps) => {
  const {
    data: { heading, dataSet },
    options = {}
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
            {dataSet.map((row, index) => (
              <TableRow
                key={'' + row[1] + row[2] + index}
                sx={
                  index % 2 === 0 ? { backgroundColor: colors.grey[100] } : {}
                }>
                {row.map((data, index) => {
                  if (options.percentColumns) {
                    const { percentColumns } = options;
                    const configColumn = percentColumns.find(
                      (column) => column.number === index
                    );
                    if (configColumn) {
                      return (
                        <TableCell
                          sx={{ py: 1 }}
                          key={'' + data + index}
                          align="center">
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
                      key={'' + data + index}
                      align="center">
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

export default StatisticTable;
