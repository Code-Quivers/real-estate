"use client";

import { cellCss, headerCss } from "@/constants/tableStyles";
import { getType } from "@/constants/tableValues";
import { useGetMyRequestedMaintenanceQuery } from "@/redux/features/maintenanceRequest/maintenanceRequestApi";
import { Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

const MyMaintenanceRequests = () => {
  const { data: myAllRequests, isError, isLoading, isFetching, error } = useGetMyRequestedMaintenanceQuery();
  return (
    <div className="max-w-[1150px] mt-6 2xl:mx-auto md:px-5 lg:px-5 max-lg:pb-10 2xl:px-0 mx-auto">
      <div>
        <h2>My Maintenance Requests | total {myAllRequests?.data?.length || 0}</h2>
      </div>

      {!isLoading && isError && (
        <div className="flex justify-center items-center min-h-[70vh] text-red-400 font-semibold text-3xl">
          {error?.message || "Something went wrong"}..
        </div>
      )}
      <div></div>

      <div className="mt-10 ">
        {!isError && (
          <Table
            bordered={true}
            cellBordered={true}
            wordWrap="break-word"
            loading={isLoading || isFetching}
            rowHeight={90}
            headerHeight={60}
            shouldUpdateScroll={false} // Prevent the scrollbar from scrolling to the top after the table
            autoHeight={true}
            data={myAllRequests?.data}
          >
            {/* Issue Type */}
            <Column width={210} align="center">
              <HeaderCell style={headerCss}>Issue Type</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData) => <div>{getType(rowData?.issueType)}</div>}
              </Cell>
            </Column>
            {/*  Description */}
            <Column flexGrow={1} minWidth={105}>
              <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>Description</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="description" />
            </Column>
            {/* Priority */}
            <Column align="center" width={150}>
              <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>Priority</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="priority">
                {(rowData) => (
                  <div>
                    <p>{getType(rowData?.priority)}</p>
                  </div>
                )}
              </Cell>
            </Column>

            {/* Owner */}
            <Column flexGrow={1} align="center">
              <HeaderCell style={headerCss}>Owner</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle">
                {(rowData) => (
                  <div className="text-center space-y-2">
                    <p>
                      {rowData?.owner?.firstName} {rowData?.owner?.lastName}
                    </p>
                    <button className="text-xs border px-2 py-1 rounded-full">Send Message</button>
                  </div>
                )}
              </Cell>
            </Column>

            {/*   Status*/}
            <Column width={150} align="center">
              <HeaderCell style={{ ...headerCss, whiteSpace: "break-spaces" }}>Status</HeaderCell>
              <Cell style={cellCss} verticalAlign="middle" dataKey="status">
                {(rowData) => (
                  <div>
                    <span
                      className={`${rowData?.status === "PENDING" ? "bg-yellow-100  border-yellow-500 text-yellow-600" : rowData?.status == "APPROVED" ? "bg-blue-100 text-blue-600 border-blue-500" : ""} px-2.5 font-medium py-1.5 border rounded-full`}
                    >
                      {rowData?.status}
                    </span>
                  </div>
                )}
              </Cell>
            </Column>
          </Table>
        )}
      </div>
    </div>
  );
};

export default MyMaintenanceRequests;
