import { Flex, Stack, Title } from "@mantine/core";
import { MRT_EditActionButtons } from "mantine-react-table";

const PropertiesEditModal = ({ table, row, internalEditComponents }: any) => {
  return (
    <>
      <Stack>
        <Title order={3}>Edit User</Title>
        {internalEditComponents}
        <Flex justify="flex-end" mt="xl">
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </Flex>
      </Stack>
    </>
  );
};

export default PropertiesEditModal;
