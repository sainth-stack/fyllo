const headStyle = {
  background: '#F8FAFC',
  textAlign: 'center',
  textTransform: 'uppercase',
  '& .MuiTableSortLabel-root.Mui-active': {
    color: '#4D515A'
  },
  color: '#4D515A',
  height: '58px',
  border: 'none',
  fontWeight: 600,
  lineHeight: '22px',
  fontFamily: 'Inter',
  fontSize: '11.659px',
  fontStyle: 'normal',
  '@media (max-width: 1536px)': {
    height: '52px',
    fontSize: '11px',
    lineHeight: '20px'
  },
  '@media (max-width: 1440px)': {
    height: '48px',
    fontSize: '10.5px',
    lineHeight: '18px'
  },
  '@media (max-width: 1280px)': {
    height: '44px',
    fontSize: '10px',
    lineHeight: '16px'
  }
};

const bodyStyle = {
  height: '52px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#E0E9FA',
    boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.10), 0px -4px 8px 0px rgba(0, 0, 0, 0.05)'
  },
  boxShadow: 'inset 0px -1px 0px #F5F5F5',
  '& .MuiTableCell-root.MuiTableCell-body': {
    padding: '0px',
    fontFamily: 'Poppins',
    border: 'none',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '16px'
  },
  '@media (max-width: 1536px)': {
    height: '48px',
    '& .MuiTableCell-root.MuiTableCell-body': {
      fontSize: '11px',
      lineHeight: '14px'
    }
  },
  '@media (max-width: 1440px)': {
    height: '44px',
    '& .MuiTableCell-root.MuiTableCell-body': {
      fontSize: '10.5px',
      lineHeight: '14px'
    }
  },
  '@media (max-width: 1280px)': {
    height: '40px',
    '& .MuiTableCell-root.MuiTableCell-body': {
      fontSize: '10px',
      lineHeight: '12px'
    }
  }
};

const tableContainerStyle = {
  maxHeight: `calc(100vh - 280px)`,
  boxShadow: 'none !important',
  '& .MuiTableRow-head': {
    height: '58px'
  },
  '& .MuiTableCell-head': {
    padding: '0px'
  },
  '& .MuiTableRow-root.Mui-selected': {
    backgroundColor: '#E0E9FA',
    '&:hover': {
      background: '#E0E9FA'
    }
  },
  '@media (max-width: 1536px)': {
    maxHeight: `calc(100vh - 280px)`,
    '& .MuiTableRow-head': {
      height: '52px'
    }
  },
  '@media (max-width: 1440px)': {
    maxHeight: `calc(100vh - 280px)`,
    '& .MuiTableRow-head': {
      height: '48px'
    }
  },
  '@media (max-width: 1280px)': {
    maxHeight: `calc(100vh - 280px)`,
    '& .MuiTableRow-head': {
      height: '44px'
    }
  }
};

const filterContainerStyle = {
  display: 'flex',
  gap: '16px',
  padding: '0px 16px 0px 16px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  marginBottom: '16px'
};

const filterInputStyle = {
  '& .MuiOutlinedInput-root': {
    height: '44px',
    fontSize: '14px',
    backgroundColor: '#F8FAFC',
    fontFamily: 'Work Sans',
    
    '& fieldset': {
      borderColor: '#E2E8F0',
      transition: 'border-color 0.2s ease-in-out',
    },
    
    '&:hover fieldset': {
      borderColor: '#E2E8F0',
    },
    
    '&.Mui-focused fieldset': {
      borderColor: '#E2E8F0',
      borderWidth: '1px',
    },

    '& input, & .MuiSelect-select': {
      padding: '8px 14px',
      color: '#64748B',
      fontWeight: 500,
      fontFamily: 'Work Sans',
    },

    '& .MuiSelect-icon': {
      color: '#64748B',
      right: '8px',
    },
  },

  '& .MuiInputLabel-root': {
    color: '#64748B',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: 'Work Sans',
    transform: 'translate(14px, 12px) scale(1)',
    
    '&.Mui-focused': {
      color: '#64748B',
    },

    '&.MuiInputLabel-shrink': {
      transform: 'translate(14px, -9px) scale(0.75)',
    },
  },

  '& .MuiInputAdornment-root': {
    color: '#64748B',
    marginLeft: '8px',
    
    '& .MuiSvgIcon-root': {
      fontSize: '18px',
    },
  },
};

export { headStyle, bodyStyle, tableContainerStyle, filterContainerStyle, filterInputStyle };
