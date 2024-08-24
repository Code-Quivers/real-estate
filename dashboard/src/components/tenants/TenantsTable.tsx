"use client";
import { useMemo, useState } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  useGetAllTenantsQuery,
  useUpdateTenantProfileMutation,
} from "@/redux/api/features/tenantsApi";
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
  const [updateTenant] = useUpdateTenantProfileMutation();
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
        // accessorKey: "password",
        accessorFn: (row) => "********",
        header: "Password",
      },
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        header: "Property owner assigned to",
        id: "propertyOwner",
        Cell: ({ cell }) => (
          <>
            <div>{cell.getValue<any>()}</div>
          </>
        ),
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
        accessorFn: (row) => (row.rentPaid ? "Yes" : "No"),
        header: "Rent paid",
      },
    ],
    [validationErrors]
  );

  const validateRequired = (values: any) => values?.length > 0;

  const validateTenant = (tenant: any) => {
    return {
      firstName: validateRequired(tenant.propertyOwner)
        ? ""
        : "First name required",
    };
  };

  const handleSaveTenant = async ({ values, table, row }: any) => {
    const tenantId = row.original.tenantId;
    console.log(tenantId, "tenantId");
    const newValidationErrors = validateTenant(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    // update tenant
    console.log(values, "values");
    console.log(row.original, "values");
    // try {
    //   await updateTenant({ data: values, tenantId });
    // } catch (error) {
    //   console.log(error, "error");
    // }

    console.log(values, "values");
  };

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // enableRowSelection: true,
    enableEditing: true,
    onEditingRowSave: handleSaveTenant,
    editDisplayMode: "modal",
    // mantineSkeletonProps: {
    //   // visible: true,
    //   animate: true,
    // },
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
    state: {
      // isSaving: true,
      // isLoading: true,
      // showLoadingOverlay: true,
      // showSkeletons: true,
    },
  });

  return <MantineReactTable table={table} />;
};

export default TenantsTable;
