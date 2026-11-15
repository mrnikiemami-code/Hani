"use client";
import { useMemo, useState, type ReactNode } from "react";
import { DataTable, type DataTableSelectionMultipleChangeEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import type { PaginatorTemplateOptions } from "primereact/paginator";

type Row = Record<string, any>;

/** Column definition shape used across the app (title / dataIndex / render / sorter). */
export interface TableColumn {
  title?: ReactNode;
  dataIndex?: string;
  key?: string;
  width?: number | string;
  className?: string;
  render?: (value: any, record: any, index: number) => ReactNode;
  sorter?: (a: any, b: any) => number;
}

interface DatatableProps {
  columns: TableColumn[];
  dataSource: Row[];
  /** Show the row checkbox column */
  Selection?: boolean;
}

const PAGE_SIZES = [10, 20, 30];

const paginatorTemplate: PaginatorTemplateOptions = {
  layout: "RowsPerPageDropdown PrevPageLink PageLinks NextPageLink",
  PrevPageLink: (options) => (
    <button type="button" className="p-paginator-prev" onClick={options.onClick} disabled={options.disabled}>
      <span>
        <i className="isax isax-arrow-left-2" />
      </span>
    </button>
  ),
  NextPageLink: (options) => (
    <button type="button" className="p-paginator-next" onClick={options.onClick} disabled={options.disabled}>
      <span>
        <i className="isax isax-arrow-right-3" />
      </span>
    </button>
  ),
};

const Datatable = ({ columns, dataSource, Selection }: DatatableProps) => {
  const [selected, setSelected] = useState<Row[]>([]);
  const total = dataSource.length;

  const paginator = useMemo(
    () => ({
      ...paginatorTemplate,
      CurrentPageReport: undefined,
    }),
    [],
  );

  return (
    <DataTable
      className="table datanew dataTable no-footer"
      value={dataSource}
      dataKey="key"
      paginator
      rows={PAGE_SIZES[0]}
      rowsPerPageOptions={PAGE_SIZES}
      paginatorTemplate={paginator}
      paginatorRight={Selection ? <span className="table-total">{`of ${total} Results`}</span> : undefined}
      selectionMode={Selection ? "checkbox" : null}
      selection={selected}
      onSelectionChange={(e: DataTableSelectionMultipleChangeEvent<Row[]>) => setSelected(e.value)}
      removableSort
    >
      {Selection && <Column selectionMode="multiple" headerClassName="app-select-column" />}
      {columns.map((col, index) => {
        const field = col.dataIndex || undefined;
        return (
          <Column
            key={col.key || field || index}
            field={field}
            header={col.title}
            className={col.className}
            style={col.width ? { width: col.width } : undefined}
            sortable={!!col.sorter}
            sortFunction={
              col.sorter
                ? ({ data, order }) => [...data].sort((a, b) => (col.sorter as NonNullable<TableColumn["sorter"]>)(a, b) * (order ?? 1))
                : undefined
            }
            body={(record: Row, options) =>
              col.render ? col.render(field ? record[field] : undefined, record, options.rowIndex) : field ? record[field] : null
            }
          />
        );
      })}
    </DataTable>
  );
};

export default Datatable;
