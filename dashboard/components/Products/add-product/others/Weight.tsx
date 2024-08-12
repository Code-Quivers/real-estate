import { Fieldset, NumberInput, Select } from '@mantine/core';

const Weight = () => {
  return (
    <>
      <Fieldset legend="Weight" radius="md" className="flex gap-5 shadow-sm">
        <NumberInput label="Weight" placeholder="0.00" />
        <Select
          label="Unit"
          placeholder="Select unit"
          data={[
            { value: 'kg', label: 'Kilogram' },
            { value: 'g', label: 'Gram' },
            { value: 'mg', label: 'Milligram' },
            { value: 'lb', label: 'Pound' },
            { value: 'oz', label: 'Ounce' },
          ]}
        ></Select>
      </Fieldset>
    </>
  );
};

export default Weight;
