"use client";
import { useMemo, useState } from "react";
import {
  MantineReactTable,
  MRT_Row,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { ActionIcon, Flex, Text, Tooltip } from "@mantine/core";
import { ModalsProvider, modals } from "@mantine/modals";
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
        accessorKey: "dueRent",
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

  // update tenant
  const handleSaveTenant = async ({ values, table, row }: any) => {
    const tenantId = row.original.tenantId;
    const newValidationErrors = validateTenant(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    // creating form data
    const formData = new FormData();
    const updatedProfileData = JSON.stringify({ password: values?.Password });
    try {
      formData.append("data", updatedProfileData);
      await updateTenant({ data: formData, tenantId });
    } catch (error) {
      console.log(error, "error");
    }

    console.log(values, "values");
  };

  // delete tenant
  const openDeleteConfirmModal = (row: MRT_Row<any>) =>
    modals.openConfirmModal({
      title: "Are you sure you want to delete this user?",
      children: (
        <Text>
          Are you sure you want to delete {row.original.firstName}{" "}
          {row.original.lastName}? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      // onConfirm: () => deleteUser(row.original.id),
    });

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
        <Tooltip label="Delete" onClick={() => openDeleteConfirmModal(row)}>
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
