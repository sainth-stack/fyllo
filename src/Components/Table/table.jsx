/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    Icon1,
    Icon2,
    Icon3,
    Icon4,
    sortIcon,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    cols,
    data,
    sx
  } = props;
  console.log(props)
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow sx={sx}>
        {cols?.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ sx }}
            style={headCell.style}
            className='custom-font'
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              IconComponent={() => sortIcon}
              className="custom-font"
            >
              {headCell.columnLabel || headCell.headerName}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function CustomTable(tableProps) {
  const {
    cols = [],
    data = [],
    parentData = [],
    page,
    setPage,
    onRowClick = () => { },
    rowsPerPage,
    headStyle,
    bodyStyle,
    Icon1,
    Icon2,
    Icon3,
    Icon4,
    rowStyle,
    tableContainerStyles,
    selected,
    setSelected,
    sortIcon,
    userSelectedRow,
    from,
    hover = true
  } = tableProps;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState();
  const [hoveredRow, setHoveredRow] = React.useState();
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(data);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, row) => {
    const target = event.target;
    const isCheckbox = target.type === 'checkbox' && target.tagName === 'INPUT';
    if (isCheckbox) {
      const selectedIndex = selected?.indexOf(row);
      let newSelected = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, row);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected?.slice(1));
      } else if (selectedIndex === selected?.length - 1) {
        newSelected = newSelected.concat(selected?.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected?.slice(0, selectedIndex), selected?.slice(selectedIndex + 1));
      }
      setSelected(newSelected);
    } else if (!isCheckbox) {
      onRowClick(row);
    }
  };
  const isSelected = (row) => {
    return (
      selected?.length > 0
        ? selected.filter((item) => item[from] === row[from])?.length > 0
        : row[from] === userSelectedRow[from])
  }
  const visibleRows = React.useMemo(
    () => stableSort(data, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, data]
  );

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Paper sx={{ maxWidth: '100%', mb: 2, boxShadow: 'none' }}>
        <TableContainer sx={{ ...tableContainerStyles }}>
          <Table sx={{ minWidth: 750 }} stickyHeader aria-labelledby="tableTitle">
            <EnhancedTableHead
              cols={cols}
              data={data}
              numSelected={selected?.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              sx={headStyle}
              Icon1={Icon1}
              Icon2={Icon2}
              sortIcon={sortIcon}
            />
            <TableBody>
              {visibleRows?.map((row, index) => {
                const isItemSelected = isSelected(row)

                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    onMouseEnter={() => hover ? setHoveredRow(row) : () => { }}
                    onMouseLeave={() => setHoveredRow('')}
                    sx={bodyStyle}
                  >
                    {cols.map((col, key) => {
                      return (
                        <TableCell key={key} sx={rowStyle} className='custom-font'>
                          {col.render(row, index, parentData)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
