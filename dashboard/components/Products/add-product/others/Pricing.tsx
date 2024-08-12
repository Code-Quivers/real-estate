import { Fieldset, NumberInput } from '@mantine/core';

const Pricing = () => {
  return (
    <>
      <Fieldset legend="Pricing" radius="md" className="grid grid-cols-4 gap-5 shadow-sm">
        <NumberInput label="Selling price" placeholder="0.00" />
        <NumberInput label="Buying price" placeholder="0.00" />
        <NumberInput label="Profit" placeholder="--" />
        <NumberInput label="Margin" placeholder="--" />
      </Fieldset>
    </>
  );
};

export default Pricing;
