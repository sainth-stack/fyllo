import { data } from "../../result"
import { Grid } from '@mui/material'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import CustomTable from "../../Components/Table/table"
import React from "react";
import { bodyStyle, headStyle, tableContainerStyle, filterContainerStyle, filterInputStyle } from "./style";
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import sortIcon from "../../assets/images/sorticon.svg"
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

const tableConstant = [
  {
    id: "id",
    field: "id",
    headerName: "ID",
    columnLabel: "ID",
    sortLabel: true,
    width: 140,
    numeric: false,
    style: {
      textAlign: 'center',
      minWidth: '140px',
      paddingLeft: '0px'
    },
    render: (row) => (
      <span className="text-nowrap custom-font" title={row.id}>
        {row.id}
      </span>
    )
  },
  {
    id: "_year",
    field: "_year",
    headerName: "Year",
    columnLabel: "Year",
    width: 200,
    numeric: false,
    sortLabel: true,
    style: {
      textAlign: 'center',
      minWidth: '200px'
    },
    render: (row) => (
      <div style={{ display: 'flex', justifyContent: 'center' }} className="custom-font">
        <span className="custom-font">{row?._year}</span>
      </div>
    )
  },
  {
    id: "month",
    field: "month",
    headerName: "Month",
    columnLabel: "Month",
    width: 150,
    numeric: false,
    sortLabel: true,
    style: {
      textAlign: 'center',
      minWidth: '150px'
    },
    render: (row) => (
      <div style={{ display: 'flex', justifyContent: 'center' }} className="custom-font">
        <span className="custom-font">{row.month}</span>
      </div>
    )
  },
  {
    id: "product",
    field: "product",
    headerName: "Product",
    columnLabel: "Product",
    width: 180,
    numeric: false,
    sortLabel: true,
    style: {
      textAlign: 'center',
      minWidth: '180px'
    },
    render: (row) => (
      <div style={{ display: 'flex', justifyContent: 'center' }} className="custom-font">
        <span className="custom-font">{row.product}</span>
      </div>
    )
  },
  {
    id: "state",
    field: "state",
    headerName: "State",
    width: 250,
    numeric: false,
    sortLabel: true,
    columnLabel: "State",
    style: {
      textAlign: 'center',
      minWidth: '250px'
    },
    render: (row) => (
      <div style={{ display: 'flex', justifyContent: 'center' }} className="custom-font">
        <span className="custom-font">{row.state}</span>
      </div>
    )
  },
  {
    id: "requirement_in_mt_",
    field: "requirement_in_mt_",
    headerName: "Requirement (MT)",
    width: 250,
    columnLabel: "Requirement (MT)",
    numeric: false,
    style: {
      textAlign: 'center',
      minWidth: '250px'
    },
    render: (row) => (
      <div style={{ display: 'flex', justifyContent: 'center' }} className="custom-font">
        <span className="custom-font">{row.requirement_in_mt_}</span>
      </div>
    )
  },
  {
    id: "availability_in_mt_",
    field: "availability_in_mt_",
    headerName: "Availability (MT)",
    width: 190,
    columnLabel: "Availability (MT)",
    numeric: false,
    style: {
      textAlign: 'center',
      minWidth: '190px'
    },
    render: (row) => (
      <div style={{ display: 'flex', justifyContent: 'center' }} className="custom-font">
        <span className="custom-font">{row.availability_in_mt_}</span>
      </div>
    )
  }
]

function ProductList() {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedMonth, setSelectedMonth] = React.useState('');
  const [selectedState, setSelectedState] = React.useState('');
  const [selectedProduct, setSelectedProduct] = React.useState('');
  const [selectedYear, setSelectedYear] = React.useState('');

  const handleClick = (row) => {
    console.log(row)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getUniqueValues = (field) => {
    return [...new Set(data.map(item => item[field]))];
  };

  const filteredData = React.useMemo(() => {
    return data.filter(item => {
      const matchesSearch = Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesMonth = !selectedMonth || item.month === selectedMonth;
      const matchesState = !selectedState || item.state === selectedState;
      const matchesProduct = !selectedProduct || item.product === selectedProduct;
      const matchesYear = !selectedYear || item._year === selectedYear;

      return matchesSearch && matchesMonth && matchesState &&
        matchesProduct && matchesYear;
    });
  }, [searchQuery, selectedMonth, selectedState, selectedProduct, selectedYear]);

  const months = getUniqueValues('month');
  const states = getUniqueValues('state');
  const products = getUniqueValues('product');
  const years = getUniqueValues('_year');

  return (
    <div className="productList">
      <Box sx={{
        padding: '0px 32px 10px 32px',
        borderBottom: '1px solid #E2E8F0',
        marginBottom: '24px'
      }}>
        <Typography variant="h5" sx={{
          color: '#1E293B',
          fontFamily: 'Work Sans',
          fontSize: '24px',
          fontWeight: 600,
          lineHeight: '32px'
        }}>
          Product List
        </Typography>
      </Box>
      <Box sx={filterContainerStyle}>
        <TextField
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={filterInputStyle}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {[
          { label: 'Month', value: selectedMonth, setter: setSelectedMonth, options: months },
          { label: 'State', value: selectedState, setter: setSelectedState, options: states },
          { label: 'Product', value: selectedProduct, setter: setSelectedProduct, options: products },
          { label: 'Year', value: selectedYear, setter: setSelectedYear, options: years },
        ].map((filter) => (
          <FormControl key={filter.label} sx={{ minWidth: 120 }}>
            <InputLabel sx={{
              fontFamily: 'Work Sans',
              color: '#64748B',
              '&.Mui-focused': {
                color: '#64748B'
              },
              transform: 'translate(14px, 12px)',
              '&.MuiInputLabel-shrink': {
                transform: 'translate(14px, -9px) scale(0.75)'
              }
            }}>
              {filter.label}
            </InputLabel>
            <Select
              value={filter.value}
              onChange={(e) => filter.setter(e.target.value)}
              label={filter.label}
              sx={{
                ...filterInputStyle,
                fontFamily: 'Work Sans',
                height: '44px',
                '& .MuiSelect-select': {
                  color: '#64748B',
                  fontSize: '14px',
                  fontWeight: 500,
                  height: '40px !important',
                  display: 'flex',
                  alignItems: 'center',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E2E8F0'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E2E8F0'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E2E8F0'
                }
              }}
            >
              <MenuItem value="" sx={{
                fontFamily: 'Work Sans',
                color: '#64748B',
                fontSize: '14px',
                fontWeight: 500
              }}>All</MenuItem>
              {filter.options.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  sx={{
                    fontFamily: 'Work Sans',
                    color: '#64748B',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
      </Box>
      <Grid item container height={`calc(100vh - 280px)`}>
        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
          <CustomTable
            Icon1={<CheckBoxOutlineBlankIcon />}
            Icon2={<CheckBoxIcon />}
            Icon3={<IndeterminateCheckBoxIcon />}
            sortIcon={<img src={sortIcon} alt="sorticon" style={{ width: 14 }} />}
            cols={tableConstant}
            onRowClick={handleClick}
            data={filteredData}
            selected={selected}
            setSelected={setSelected}
            rowsPerPage={rowsPerPage}
            page={page}
            setPage={setPage}
            from="id"
            userSelectedRow={{}}
            hover={true}
            headStyle={headStyle}
            bodyStyle={bodyStyle}
            tableContainerStyles={{
              ...tableContainerStyle,
              maxHeight: `calc(100vh - 300px)`
            }}
            rowStyle={{ color: 'black' }}
          />
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: '0px 32px',
              background: '#F8FAFC',
              borderRadius: '0px 0px 8px 8px',
              marginTop: 'auto'
            }}
          >
            <TablePagination
              component="div"
              count={filteredData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 15, 25]}
              sx={{
                '.MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-displayedRows': {
                  color: '#64748B',
                  fontFamily: 'Work Sans',
                  fontSize: '14px',
                  fontWeight: 500,
                }
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductList
