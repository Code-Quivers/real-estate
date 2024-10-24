import {
  Box,
  Button,
  Flex,
  LoadingOverlay,
  PasswordInput,
  Stack,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconExclamationCircleFilled } from "@tabler/icons-react";

const PropertyOwnerEditModal = ({
  table,
  row,
  updatePropertyOwner,
  error,
}: any) => {
  const [visible, { toggle }] = useDisclosure(false);
  const [overlayVisible, { toggle: toggleOverlay }] = useDisclosure(false);
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

  // update
  const handleUpdateTenant = async (values: any) => {
    table.setEditingRow(null);
    const id = notifications.show({
      loading: true,
      title: "Updating Property Owner",
      message: "Please wait while we update the Property Owner",
      position: "top-right",
      color: "blue",
      autoClose: false,
      withBorder: true,
      withCloseButton: false,
    });
    const propertyOwnerId = row?.original?.propertyOwnerId;
    const formData = new FormData();
    const updatedProfileData = JSON.stringify({ password: values?.password });
    try {
      formData.append("data", updatedProfileData);
      const response = await updatePropertyOwner({
        data: formData,
        propertyOwnerId,
      });
    
      if (response?.data?.success) {
        // toggleOverlay();
        notifications.update({
          id,
          loading: false,
          title: "Success",
          message: "Property Owner updated successfully",
          position: "top-right",
          color: "green",
          withBorder: true,
          autoClose: 3000,
          icon: <IconCheck />,
        });
      } else if (response?.error) {
        // toggleOverlay();
        table.setEditingRow(null);
        notifications.update({
          id,
          loading: false,
          title: "Error",
          message: "Failed to update Property owner",
          position: "top-right",
          color: "red",
          withBorder: true,
          autoClose: 4000,
          icon: <IconExclamationCircleFilled />,
        });
      }
    } catch (err) {
      // console.log(err, "error");
    }
  };

  return (
    <>
      <Box pos="relative">
        <LoadingOverlay
          visible={overlayVisible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ type: "bars", size: "md" }}
        />
        <form onSubmit={form.onSubmit(handleUpdateTenant)}>
          <Stack>
            <Title order={3}>Edit</Title>
            <PasswordInput
              label="New password"
              visible={visible}
              key={form.key("password")}
              {...form.getInputProps("password")}
              onVisibilityChange={toggle}
            />
            <PasswordInput
              label="Confirm new password"
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
      </Box>
    </>
  );
};

export default PropertyOwnerEditModal;
