"use client";
import { useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import PropertiesEditModal from "./propertiesComponents/PropertiesEditModal";

// type Person = {
//   email: string;
//   password: string;
// };

//nested data is ok, see accessorKeys in ColumnDef below
// const data = [
//   {
//     address: "123 Street FL",
//     owner: "John Doe",
//     tenantAssigned: "Jhon Cena",
//     serviceProvider: "Selim Brothers",
//     propertyRented: "Yes",
//     rentAmount: 1000,
//     rentPaid: 900,
//     paymentDeadline: "2022-12-12",
//     password: "password",
//   },
//   {
//     address: "123 Street FL",
//     owner: "John Doe",
//     tenantAssigned: "Jhon Cena",
//     serviceProvider: "Selim Brothers",
//     propertyRented: "Yes",
//     rentAmount: 1000,
//     rentPaid: 900,
//     paymentDeadline: "2022-12-12",
//     password: "password",
//   },
//   {
//     address: "123 Street FL",
//     owner: "John Doe",
//     tenantAssigned: "Jhon Cena",
//     serviceProvider: "Selim Brothers",
//     propertyRented: "Yes",
//     rentAmount: 1000,
//     rentPaid: 900,
//     paymentDeadline: "2022-12-12",
//     password: "password",
//   },
//   {
//     address: "123 Street FL",
//     owner: "John Doe",
//     tenantAssigned: "Jhon Cena",
//     serviceProvider: "Selim Brothers",
//     propertyRented: "Yes",
//     rentAmount: 1000,
//     rentPaid: 900,
//     paymentDeadline: "2022-12-12",
//     password: "password",
//   },
//   {
//     address: "123 Street FL",
//     owner: "John Doe",
//     tenantAssigned: "Jhon Cena",
//     serviceProvider: "Selim Brothers",
//     propertyRented: "Yes",
//     rentAmount: 1000,
//     rentPaid: 900,
//     paymentDeadline: "2022-12-12",
//     password: "password",
//   },
//   {
//     address: "123 Street FL",
//     owner: "John Doe",
//     tenantAssigned: "Jhon Cena",
//     serviceProvider: "Selim Brothers",
//     propertyRented: "Yes",
//     rentAmount: 1000,
//     rentPaid: 900,
//     paymentDeadline: "2022-12-12",
//     password: "password",
//   },
//   {
//     address: "123 Street FL",
//     owner: "John Doe",
//     tenantAssigned: "Jhon Cena",
//     serviceProvider: "Selim Brothers",
//     propertyRented: "Yes",
//     rentAmount: 1000,
//     rentPaid: 900,
//     paymentDeadline: "2022-12-12",
//     password: "password",
//   },
//   {
//     address: "123 Street FL",
//     owner: "John Doe",
//     tenantAssigned: "Jhon Cena",
//     serviceProvider: "Selim Brothers",
//     propertyRented: "Yes",
//     rentAmount: 1000,
//     rentPaid: 900,
//     paymentDeadline: "2022-12-12",
//     password: "password",
//   },
//   {
//     address: "123 Street FL",
//     owner: "John Doe",
//     tenantAssigned: "Jhon Cena",
//     serviceProvider: "Selim Brothers",
//     propertyRented: "Yes",
//     rentAmount: 1000,
//     rentPaid: 900,
//     paymentDeadline: "2022-12-12",
//     password: "password",
//   },
//   {
//     address: "123 Street FL",
//     owner: "John Doe",
//     tenantAssigned: "Jhon Cena",
//     serviceProvider: "Selim Brothers",
//     propertyRented: "Yes",
//     rentAmount: 1000,
//     rentPaid: 900,
//     paymentDeadline: "2022-12-12",
//     password: "password",
//   },
// ];

const PropertiesTable = ({ properties }: any) => {
  const { data } = properties;
  // console.log(data, "properties");
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "address",
        header: "Address",
        minSize: 100, //min size enforced during resizing
        maxSize: 200, //max size enforced during resizing
        size: 180, //medium column
      },
      {
        accessorFn: (row) => row.owner.user.email,
        id: "owner",
        header: "Owner",
        Cell: ({ cell }) => (
          <>
            <div>{cell.getValue<any>()}</div>
          </>
        ),
        enableEditing: () => false,
      },
      {
        accessorFn: (row) =>
          row.Tenant ? row.Tenant.user.email : "No Tenant Assigned",
        id: "tenantAssigned",
        // accessorKey: "Tenant.user.email",
        header: "Tenant Assigned",
        Cell: ({ cell }) => (
          <>
            <div>{cell.getValue<any>()}</div>
          </>
        ),
        enableEditing: () => false,
      },
      {
        accessorKey: "serviceProvider",
        header: "Service Provider",
        enableEditing: () => false,
      },
      {
        accessorFn: (row) => (row.isRented ? "Yes" : "No"),
        id: "propertyRented",
        header: "Property Rented",
        enableEditing: () => false,
        Cell: ({ cell }) => (
          <>
            <div>{cell.getValue<any>()}</div>
          </>
        ),
      },
      {
        accessorKey: "monthlyRent",
        header: "Rent Amount",
        enableEditing: () => false,
      },
      {
        accessorFn: (row) => (row?.Tenant?.rentPaid ? "Yes" : "No"),
        header: "Rent Paid",
        enableEditing: () => false,
      },
      {
        accessorFn: (row) => row?.Tenant?.paymentDeadline,
        accessorKey: "paymentDeadline",
        header: "Payment Deadline",
        enableEditing: () => false,
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true,
    // layoutMode: "semantic",
    enableColumnActions: false,
    enableEditing: true,
    editDisplayMode: "modal",
    renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
      <PropertiesEditModal
        table={table}
        row={row}
        internalEditComponents={internalEditComponents}
      />
    ),
    positionActionsColumn: "last",
    initialState: { density: "xs" },
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="Edit">
          <ActionIcon onClick={() => table.setEditingRow(row)}>
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete">
          <ActionIcon color="red">
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default PropertiesTable;
