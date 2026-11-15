// index.tsx
import React, { useEffect, useState } from "react";
import { Table } from "antd";

// Temporary local interface definition to resolve import issue
interface DatatableProps {
  columns: any[]; // You can replace `any[]` with the specific type of columns you expect
  dataSource: any[]; // You can replace `any[]` with the specific type of dataSource you expect
  Selection?: boolean | undefined;
}


const Datatable: React.FC<DatatableProps> = ({ columns, dataSource , Selection }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [_searchText, _setSearchText] = useState<string>("");
  const [Selections, setSelections] = useState<any>(true);
  const [filteredDataSource, _setFilteredDataSource] = useState(dataSource);

  const onSelectChange = (newSelectedRowKeys: any[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  useEffect(() => {
    return setSelections(Selection);
  }, [Selection])
  
  
  return (
    <>
     {/* <div className="table-top-data d-flex px-3 justify-content-between">
      <div className="page-range">
      </div>
      <div className="serch-global text-right">
        <input type="search" className="form-control form-control-sm mb-3 w-auto float-end" value={searchText} placeholder="Search" onChange={(e) => handleSearch(e.target.value)} aria-controls="DataTables_Table_0"></input>
      </div>
     </div> */}
     {!Selections ?
      <Table
      className="table datanew dataTable no-footer"
     
      columns={columns}
      rowHoverable={false}
      dataSource={filteredDataSource}
      pagination={{
        locale: { items_per_page: "" },
        nextIcon: <span><i className="isax isax-arrow-right-3" /></span>,
        prevIcon: <span><i className="isax isax-arrow-left-2" /></span>,
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
      }}
    /> : 
    <Table
        className="table datanew dataTable no-footer"
        rowSelection={rowSelection}
        columns={columns}
        rowHoverable={false}
        dataSource={filteredDataSource}
        pagination={{
          locale: { items_per_page: "" },
          nextIcon: <span><i className="isax isax-arrow-right-3" /></span>,
          prevIcon: <span><i className="isax isax-arrow-left-2" /></span>,
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
          showTotal: (total) => `of ${total} Results`,
        }}
      />}
      
    </>
  );
};

export default Datatable;
