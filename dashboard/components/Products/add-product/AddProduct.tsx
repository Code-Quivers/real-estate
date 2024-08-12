'use client';
import { useForm } from '@mantine/form';
import { Button, Checkbox, Fieldset, Group, Radio } from '@mantine/core';
import React, { useEffect, useMemo, useState } from 'react';
import ColorVariants from './variants/ColorVariants';
import SizeVariants from './variants/SizeVariants';
import VariantList from './variants/variantTable/VariantList';
import ProductInformation from './others/ProductInformation';
import ProductGallery from './others/ProductGallery';
import Pricing from './others/Pricing';
import Weight from './others/Weight';

const AddProduct = () => {
  const [variantType, setVariantType] = useState<string>('No');
  const [variantSelected, setVariantSelected] = useState<string[]>([]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      productInfo: {
        title: '',
        description: '',
        category: '',
      },
      color: '',
      size: '',
      colorList: [],
      sizeList: [],
      variantList: [] as any[],
    },
    // validate: {
    //   color: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
    // },
  });

  const colorList = form.getValues().colorList;
  const sizeList = form.getValues().sizeList;

  console.log('colorSize', colorList, sizeList);

  const combinations = useMemo(() => {
    const newCombinations = [] as any[];
    if (colorList.length > 0 && sizeList.length > 0) {
      colorList.forEach((color) => {
        sizeList.forEach((size) => {
          newCombinations.push({ color, size });
        });
      });
    } else if (colorList.length > 0) {
      colorList.forEach((color) => {
        newCombinations.push({ color });
      });
    } else if (sizeList.length > 0) {
      sizeList.forEach((size) => {
        newCombinations.push({ size });
      });
    }
    return newCombinations;
  }, [colorList, sizeList]);

  useEffect(() => {
    if (JSON.stringify(combinations) !== JSON.stringify(form.getValues().variantList)) {
      form.setFieldValue('variantList', combinations);
    }
  }, [combinations, form]);

  return (
    <>
      <form className="bg-white px-4" onSubmit={form.onSubmit((values) => console.log(values))}>
        <div className="mb-2 text-right">
          <Button type="submit" variant="" radius={'md'} className="text-lg">
            Save
          </Button>
        </div>
        <section className="mb-5 grid grid-cols-2 gap-5">
          <ProductInformation form={form} />
          <section className="space-y-5">
            <Pricing />
            <Weight />
          </section>
        </section>
        {/* pricing and weight */}
        {/* product gallery */}
        <section>
          <ProductGallery />
        </section>
        <section>
          <div className="mt-5 flex items-center gap-5">
            <p>Does this product have variations, such as colors or sizes?</p>
            <Radio.Group name="favoriteFramework" value={variantType} onChange={setVariantType}>
              <Group mt="xs">
                <Radio value="Yes" label="Yes" />
                <Radio value="No" label="No" />
              </Group>
            </Radio.Group>
          </div>

          {variantType == 'Yes' ? (
            <>
              <Fieldset legend="Variants" radius="md" className=" shadow-sm">
                <div className="space-y-3">
                  {/* choose variants type checkbox */}
                  <div className="flex items-center gap-2">
                    <h2>Choose variation type:</h2>
                    <Checkbox.Group value={variantSelected} onChange={setVariantSelected}>
                      <Group mt="xs">
                        <Checkbox value="color" label="Color" />
                        <Checkbox value="size" label="Size" />
                      </Group>
                    </Checkbox.Group>
                  </div>
                  {/* variants size and color add */}
                  <div className="space-y-5">
                    {variantSelected.includes('color') && <ColorVariants form={form} />}
                    {variantSelected.includes('size') && <SizeVariants form={form} />}
                  </div>
                </div>
              </Fieldset>

              <div>
                <VariantList form={form} />
              </div>
            </>
          ) : null}
        </section>
      </form>
    </>
  );
};

export default AddProduct;
