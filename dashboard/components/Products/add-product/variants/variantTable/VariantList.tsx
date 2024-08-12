import { NumberInput, Table, TextInput } from '@mantine/core';
import VariantImage from './VariantImage';

const VariantList = ({ form }: any) => {
  const variantList = form.getValues().variantList;
  console.log('variantList', variantList[0]);

  const rows = variantList?.map((element: any, idx: number) => (
    <Table.Tr key={idx}>
      <Table.Td>
        <VariantImage />
      </Table.Td>
      <Table.Td>
        {element?.color && element?.color} {element?.size && element?.size}
      </Table.Td>
      <Table.Td>
        <NumberInput placeholder="Price" key={form.key(`variantList.${idx}.price`)} {...form.getInputProps(`variantList.${idx}.price`)} />
      </Table.Td>
      <Table.Td>
        <NumberInput placeholder="Quantity" key={form.key(`variantList.${idx}.quantity`)} {...form.getInputProps(`variantList.${idx}.quantity`)} />
      </Table.Td>
      <Table.Td>
        <TextInput placeholder="SKU" key={form.key(`variantList.${idx}.sku`)} {...form.getInputProps(`variantList.${idx}.sku`)} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      {variantList?.length > 0 && (
        <div className="mt-5 rounded-md border bg-white p-4">
          <Table withTableBorder className="rounded-md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Image</Table.Th>
                <Table.Th>Variant</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>SKU</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default VariantList;
