import React from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { columns, data } from './dataone';

function Style1() {

    const tableData = {
        columns,
        data,
    };

    return (
        <div className="ms-panel">
            <div className="ms-panel-header">
                <h6>Hoverable Rows Datatable</h6>
            </div>
            <div className="ms-panel-body">
                <p className="ms-directions">Check <code>/src/components/sections/datatables/dataone.json</code> for reference</p>
                <div className="table-responsive datatables row">
                    <DataTableExtensions {...tableData}>
                        <DataTable
                            columns={columns}
                            data={data}
                            pagination
                            responsive={true}
                            highlightOnHover
                            noHeader
                        />
                    </DataTableExtensions>
                </div>
            </div>
        </div>
    );
}

export default Style1;