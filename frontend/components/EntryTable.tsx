import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getByDay } from '../src/api/entry';
import './EntryTable.css'

type Props = {
    day: Date;
};

  const columns: GridColDef[] = [
    { field: 'id', headerName: '#', flex: 1, editable:false, align:'left' },
    { field: 'project_id', headerName: 'Project', flex: 1, editable:false, align:'left' },
    { field: 'description', headerName: 'Description', flex: 2, editable:false, align:'left' },
    { field: 'hours', headerName: 'Hours', flex: 1, editable:false, align:'left' }
  ];

export function EntryTable(props: Props) {

    const [entries, setEntries] = useState<Entry[]>()

    useEffect(() => {
        const fetchData = async () => {
          const entries = await getByDay(props.day);
          console.log(entries);
            

          setEntries(entries);
        };
    
        fetchData().catch(console.error);
      }, [props.day]);
    
  
  return (
    <div style={{ height: 300, width: '100%' }}>
    {entries && <DataGrid rows={entries} columns={columns} disableRowSelectionOnClick autoHeight disableColumnMenu disableColumnFilter hideFooter/>}
  </div>
  );
}

