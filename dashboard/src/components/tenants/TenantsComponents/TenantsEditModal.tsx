import { Button, Flex, PasswordInput, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

const TenantsEditModal = ({
  table,
  row,
  internalEditComponents,
  updateTenant,
}: any) => {
  const [visible, { toggle }] = useDisclosure(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
        if (!passwordPattern.test(value)) {
          return "Password should include at least 1 lowercase letter, 1 uppercase letter, 1 special character, and be at least 6 characters long";
        }
      },
      confirmPassword: (value, values) => {
        if (value !== values.password) {
          return "Passwords should match";
        }
      },
    },
  });
  const handleUpdateTenant = async (values: any) => {
    const tenantId = row.original.tenantId;
    const formData = new FormData();
    const updatedProfileData = JSON.stringify({ password: values?.password });
    try {
      formData.append("data", updatedProfileData);
      const response = (await updateTenant({
        data: formData,
        tenantId,
      })) as any;
      if (response.data.success) {
        table.setEditingRow(null);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleUpdateTenant)}>
        <Stack>
          <Title order={3}>Edit</Title>
          <PasswordInput
            label="Password"
            visible={visible}
            key={form.key("password")}
            {...form.getInputProps("password")}
            onVisibilityChange={toggle}
          />
          <PasswordInput
            label="Confirm password"
            visible={visible}
            onVisibilityChange={toggle}
            {...form.getInputProps("confirmPassword")}
            key={form.key("confirmPassword")}
          />
          {/* {internalEditComponents} */}
          <Flex justify="flex-end" mt="xl">
            <Button
              variant="subtle"
              color="blue"
              onClick={() => {
                table.setEditingRow(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="filled"
              color="blue"
              ml="sm"
              // disabled={form.isInvalid}
            >
              Save
            </Button>
            {/* <MRT_EditActionButtons variant="text" table={table} row={row} /> */}
          </Flex>
        </Stack>
      </form>
    </>
  );
};

export default TenantsEditModal;
