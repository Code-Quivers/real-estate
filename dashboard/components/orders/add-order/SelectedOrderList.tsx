import { NumberInput, NumberInputHandlers, Table } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useRef } from 'react';
import { FiTrash2 } from 'react-icons/fi';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];
const SelectedOrderList = () => {
  const handlersRef = useRef<NumberInputHandlers>(null);

  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>
        <div>
          <div className="col-span-4 flex w-full items-start gap-2  ">
            <div className="border p-3">Image</div>
            <div className="">
              <h2 className="font-medium text-[#0b62d5] hover:underline">Classic Leather Jacket</h2>
              <h2 className=" text-sm  text-[#ababab]">Small</h2>
              <h2 className="text-semibold">৳60.00</h2>
            </div>
          </div>
        </div>
      </Table.Td>
      <Table.Td>
        <div>
          <NumberInput size="xs" handlersRef={handlersRef} radius="sm" defaultValue={1} allowDecimal={false} clampBehavior="strict" min={1} max={100} step={1} minLength={1} />
        </div>
      </Table.Td>
      <Table.Td>
        <div className="flex items-center justify-between px-1">
          <p>${element.mass}</p>
          <button type="button" className="rounded-lg p-1 text-[#a7a7a7] transition-all duration-100 hover:bg-[#a7a7a752] hover:text-red-600 active:translate-y-[2px] active:bg-[#f00c0c2f]">
            <IconTrash size={18} />
          </button>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <tr className="border-b">
      <th style={{ width: '60%' }} className="text-start">
        <span className="font-semibold ">Product</span>
      </th>
      <th style={{ width: '20%' }}>
        <span className="font-semibold">Quantity</span>
      </th>
      <th style={{ width: '20%', textAlign: 'center' }}>
        <span className="font-semibold">Total</span>
      </th>
    </tr>
  );

  return (
    <div>
      <Table highlightOnHover={true} verticalSpacing="lg" withRowBorders={true}>
        <thead>{ths}</thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default SelectedOrderList;
