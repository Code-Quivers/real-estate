import { Fieldset, TextInput, Textarea } from '@mantine/core';

const ProductInformation = ({ form }: any) => {
  return (
    <>
      <Fieldset legend="Product information" radius="md" className="shadow-sm">
        <TextInput label="Title" placeholder="Classic full shirt" key={form.key('productInfo.title')} {...form.getInputProps('productInfo.title')} />
        <Textarea
          mt={'sm'}
          label="Description"
          placeholder="Description"
          minRows={5}
          maxRows={7}
          autosize
          key={form.key('productInfo.description')}
          {...form.getInputProps('productInfo.description')}
        />
        <TextInput label="Category" placeholder="Clothing" key={form.key('productInfo.category')} {...form.getInputProps('productInfo.category')} />
      </Fieldset>
    </>
  );
};

export default ProductInformation;
