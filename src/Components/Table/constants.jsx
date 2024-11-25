import react from 'react'
export const tableConstant = () => [
  {   
    numeric:false,
    id: "name",
    columnLabel: "DESRT (100g servin)",
    render: (row: any) => <span className="text-nowrap">{row.name}</span>,
  },
  {
    
    numeric:false,
    id: "calories",
    columnLabel: "Calories",
    render: (row: any) => <span>{row.calories}</span>,
  },
  {
    
    numeric:false,
    id: "fat",
    columnLabel: "Fat (g)",
    render: (row: any) => <span>{row.fat}</span>,
  },
  {
    
    numeric:false,
    id: "carbs",
    columnLabel: "Carbs (g)",
    render: (row: any) => <span>{row.carbs}</span>,
  },
  {
    numeric:false,
    id: "protein",
    columnLabel: "Protein (g)",
    render: (row: any) => <span>{row.protein}</span>,
  },
  {
    numeric:false,
    id: "date",
    columnLabel: "Date",
    render: (row: any) => {
   
      return <span>{row.date}</span>;
    },
  },
];

