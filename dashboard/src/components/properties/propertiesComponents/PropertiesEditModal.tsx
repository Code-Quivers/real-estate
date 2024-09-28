import { Flex, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MRT_EditActionButtons } from "mantine-react-table";

const PropertiesEditModal = ({
  table,
  row,
  internalEditComponents,
  isLoading,
}: any) => {
  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 5
          ? null
          : "Password should contain at least 5 characters",
    },
  });

  // ! handle submit
  const handleDashboardLogin = async (values: any) => {
    console.log("values", values);
    const loginData = {
      email: values?.email,
      password: values?.password,
    };
  };

  return (
    <>
      <Stack>
        <Title order={3}>Edit Property</Title>
        {internalEditComponents}

        <Flex justify="flex-end" mt="xl">
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </Flex>
      </Stack>
    </>
  );
};

export default PropertiesEditModal;
// {
//   /* <div>
//           <div>
//             <form */
// }
// {
//   /* onSubmit={form.onSubmit((values) => handleDashboardLogin(values))}
//             > */
// }
// {
//   /* <div className="space-y-3"> */
// }
// {
//   /* address */
// }
// {
//   /* <div>
//                   <TextInput
//                     label="Address"
//                     placeholder="Input Address"
//                     key={form.key("address")}
//                     defaultValue={row?.original?.address}
//                     {...form.getInputProps("address")}
//                   />
//                 </div> */
// }
// {
//   /* owner */
// }
// {
//   /* <div>
//                   <TextInput
//                     label="Owner"
//                     disabled
//                     defaultValue={row?.original?.owner?.user?.email}
//                   />
//                 </div> */
// }
// {
//   /* tenant assigned */
// }
// {
//   /* <div>
//                   <TextInput
//                     label="Tenant Assigned"
//                     disabled
//                     defaultValue={row?.original?.Tenant?.user?.email}
//                   />
//                 </div> */
// }
// {
//   /* property rented */
// }
// {
//   /* <div>
//                   <TextInput
//                     label="Property Rented"
//                     disabled
//                     defaultValue={row?.original?.isRented ? "Yes" : "No"}
//                   />
//                 </div> */
// }
// {
//   /* Rent Amount */
// }
// {
//   /* <div>
//                   <TextInput
//                     label="Rent Amount"
//                     defaultValue={row?.original?.monthlyRent}
//                     key={form.key("monthlyRent")}
//                     {...form.getInputProps("monthlyRent")}
//                   />
//                 </div> */
// }

// {
//   /* Rent Paid */
// }
// {
//   /* <div>
//                   <Select
//                     label="Rent Paid"
//                     clearable={false}
//                     defaultValue={
//                       row?.original?.Tenant?.rentPaid ? "Yes" : "No"
//                     }
//                     data={["Yes", "No"]}
//                   />
//                 </div> */
// }

// {
//   /* payment deadline */
// }
// {
//   /* <div>
//                   <DateInput
//                     defaultValue={
//                       row?.original?.paidTo
//                         ? new Date(row?.original?.paidTo)
//                         : undefined
//                     }
//                     label="Payment Deadline"
//                   />
//                 </div> */
// }
// {
//   /* </div>
//             </form> */
// }
// {
//   /* </div> */
// }
// {
//   /* </div> */
// }
