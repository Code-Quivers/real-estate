import { Autocomplete, TextInput, Textarea } from '@mantine/core';
import SelectAddress from './SelectAddress';

const AddCustomer = () => {
  return (
    <div className="mt-3">
      <Autocomplete placeholder="Phone no" label="Phone no" data={['Rafi', 'Mostafizur Rahman', 'Salim', 'Shafin', 'Ridoy']} />
      <TextInput placeholder="Name" label="Name" mt={'xs'} />
      <Textarea placeholder="Address" label="Address" mt={'xs'} />
      <SelectAddress />
    </div>
  );
};

export default AddCustomer;
