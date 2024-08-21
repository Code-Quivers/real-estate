"use client";
import { useMemo, useState } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useGetAllTenantsQuery } from "@/redux/api/features/tenantsApi";
import TenantsEditModal from "./TenantsComponents/TenantsEditModal";
// type Person = {
//   tenantName: string;
//   password: string;
//   rentAmount: number;
//   rentPaid: number;
// };

//nested data is ok, see accessorKeys in ColumnDef below
// const data: Person[] = [
//   {
//     tenantName: "John Doe",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 900,
//   },
//   {
//     tenantName: "Jane Doe",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 1000,
//   },
//   {
//     tenantName: "John Smith",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 1000,
//   },
//   {
//     tenantName: "Jane Smith",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 1000,
//   },
//   {
//     tenantName: "John Johnson",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 1000,
//   },
//   {
//     tenantName: "Jane Johnson",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 1000,
//   },
//   {
//     tenantName: "John Brown",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 1000,
//   },
//   {
//     tenantName: "Jane Brown",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 1000,
//   },
//   {
//     tenantName: "John White",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 1000,
//   },
//   {
//     tenantName: "Jane White",
//     password: "password",
//     rentAmount: 1000,
//     rentPaid: 1000,
//   },
// ];

const TenantsTable = ({ tenantData, isLoading, isFetching }: any) => {
  const { data } = tenantData;
  console.log(data, "tenantData");
  const [validationErrors, setValidationErrors] = useState<{
    firstName?: string;
  }>({});
  //should be memoized or stable

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "user.email",
        header: "Email",
        enableEditing: false,
      },
      {
        accessorKey: "password",
        header: "Password",
      },
      {
        accessorKey: "firstName",
        header: "Property owner assigned to",
        mantineEditTextInputProps: {
          type: "text",
          required: true,
          error: validationErrors?.firstName,
          onFocus: () => {
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            });
          },
        },
      },

      {
        accessorKey: "affordableRentAmount",
        header: "Rent amount",
      },
      {
        accessorKey: "rentPaid",
        header: "Rent paid",
      },
    ],
    [validationErrors]
  );

  const validateRequired = (values: any) => values?.length > 0;

  const validateTenant = (tenant: any) => {
    return {
      firstName: validateRequired(tenant.firstName)
        ? ""
        : "First name required",
    };
  };

  const handleSaveTenant = async ({ values, table }: any) => {
    const newValidationErrors = validateTenant(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
    }
  };

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true,
    enableEditing: true,
    onEditingRowSave: handleSaveTenant,
    editDisplayMode: "modal",
    renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
      <TenantsEditModal
        table={table}
        row={row}
        internalEditComponents={internalEditComponents}
      />
    ),
    enableColumnActions: false,
    positionActionsColumn: "last",
    initialState: { density: "xs" },
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="Edit">
          <ActionIcon>
            <IconEdit onClick={() => table.setEditingRow(row)} />
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

export default TenantsTable;
