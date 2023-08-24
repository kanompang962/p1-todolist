import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const ListTable = ({ listContent, editContent, removeContent }) => {
  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    // { field: "firstName", headerName: "First name", width: 130 },
    { field: "data", headerName: "Content", width: 170 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <div className="flex flex-row px-4">
            <Button
              onClick={() => editContent(params.row.id)}
              variant="contained"
              // color="warning"
              className="bg-yellow-gradient"
            >
              Edit
            </Button>
            <Button
              onClick={() => removeContent(params.row.id)}
              variant="outlined"
              color="error"
            >
              Del
            </Button>
          </div>
        );
      },
    },
  ];

  //   const rows = [
  //     { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //     { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //     { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //     { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //     { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //     { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //     { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //     { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //     { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  //   ];

  //   console.log(listContent);

  return (
    <div className="md:w-[450px] h-[370px]">
      <DataGrid
        rows={listContent}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default ListTable;
