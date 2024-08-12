/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';
import { Spotlight, spotlight } from '@mantine/spotlight';
import { Checkbox, FocusTrap, Input, Text, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { IoClose } from 'react-icons/io5';
import { FaArrowLeftLong } from 'react-icons/fa6';
import classes from '@/styles/checkbox-styles/checkbox.module.css';

const data = [
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    title: 'Bender Bending Rodríguez',
    new: true,
    price: '10.00',
    variants: [
      {
        name: 'small',
        price: '60.00',
      },
      {
        name: 'Medium',
        price: '60.00',
      },
      {
        name: 'Large',
        price: '60.00',
      },
    ],
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    title: 'Carol Miller',
    new: false,
    price: '42.00',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    title: 'Homer Simpson',
    new: false,
    price: '120.00',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
    title: 'Spongebob Squarepants',
    new: false,
    price: '20.00',
  },
];

const SelectFromAllProductsModal = () => {
  const [query, setQuery] = useState('');

  const items = data
    .filter((item) => item.title.toLowerCase().includes(query.toLowerCase().trim()))
    .map((item) => (
      <div key={item.title} onClick={() => console.log(item)}>
        <>
          {item?.variants?.length && item?.variants?.length > 0 ? (
            <>
              <div className="border-b border-t px-4  py-1 hover:bg-black/5">
                <Checkbox
                  size="sm"
                  indeterminate={item?.new}
                  classNames={classes}
                  checked
                  label={
                    <div className="grid w-[705px] grid-cols-5  items-center justify-between">
                      <div className="col-span-3 flex items-center">
                        {item.image && (
                          <div className="mr-2">
                            <img src={item.image} alt={item.title} width={50} height={50} />
                          </div>
                        )}
                        <Text size="sm">{item.title}</Text>
                      </div>
                      <div className=" col-span-2 grid grid-cols-2 items-center gap-2">
                        <div className="flex justify-end">
                          <p>1 available</p>
                        </div>
                        <div className="flex justify-end">
                          <p>৳{item?.price} BDT</p>
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
              {item?.variants?.map((variant, idx) => (
                <div key={idx} className={`${idx !== 0 && 'border-t'} w-full  py-2 pl-14 hover:bg-black/5`}>
                  <Checkbox
                    size="sm"
                    defaultChecked
                    className="!w-full"
                    label={
                      <div className="grid !w-[665px] grid-cols-5  items-center justify-between">
                        <div className="col-span-3">
                          <p>{variant?.name}</p>
                        </div>
                        <div className=" col-span-2 grid grid-cols-2 items-center gap-6">
                          <div className="flex justify-end">
                            <p>22 available</p>
                          </div>
                          <div className="flex justify-end  ">
                            <p>৳{variant?.price} BDT</p>
                          </div>
                        </div>
                      </div>
                    }
                  />
                </div>
              ))}
            </>
          ) : (
            <div className="border-t px-4 py-1 hover:bg-black/5">
              <Checkbox
                size="sm"
                classNames={classes}
                checked
                label={
                  <div className="grid w-[705px] grid-cols-5  items-center justify-between">
                    <div className="col-span-3 flex items-center">
                      {item.image && (
                        <div className="mr-2">
                          <img src={item.image} alt={item.title} width={50} height={50} />
                        </div>
                      )}
                      <Text size="sm">{item.title}</Text>
                    </div>

                    <div className=" col-span-2 grid grid-cols-2 items-center gap-2">
                      <div className="flex justify-end">
                        <p>1 available</p>
                      </div>
                      <div className="flex justify-end">
                        <p>৳{item?.price} BDT</p>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          )}
        </>
      </div>
    ));
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <Input
        // size="sm"
        radius="md"
        value={inputValue}
        placeholder="Search products"
        onChange={(event) => {
          if (event.target.value.trim() !== '') {
            spotlight.open();
          }
          setInputValue(event.target.value);
        }}
        leftSection={<IconSearch stroke={3} size={16} />}
      />

      <Spotlight.Root onSpotlightClose={() => setInputValue('')} closeOnClickOutside={false} size="xl" radius="lg" query={query} onQueryChange={setQuery}>
        <div className="">
          <div className="flex items-center justify-between bg-[#f3f3f3] px-4 py-4">
            <div className="flex items-center gap-3">
              <button type="button" className="text-gray-500 outline-none   hover:text-black" onClick={() => spotlight.close()}>
                <FaArrowLeftLong size={20} />
              </button>
              <h2>All Products</h2>
            </div>
            <button type="button" className="text-gray-500 hover:text-black" onClick={() => spotlight.close()}>
              <IoClose size={20} />
            </button>
          </div>

          <div className="w-full px-4 py-2">
            <FocusTrap active={true}>
              <TextInput
                radius="md"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                size="sm"
                placeholder="Search product"
                data-autofocus
                leftSection={<IconSearch stroke={1.5} />}
              />
            </FocusTrap>
          </div>

          <Spotlight.ActionsList>
            {items.length > 0 ? (
              items
            ) : (
              <Spotlight.Empty>
                <div className="flex h-[25vh] items-center justify-center">
                  <h2>Nothing found...</h2>
                </div>
              </Spotlight.Empty>
            )}
          </Spotlight.ActionsList>

          <div className="flex items-center gap-4 border p-4">
            <div className="w-full">
              <Spotlight.Footer>
                <div className="flex items-center justify-between">
                  <div>
                    <button className="rounded-md border border-[#ffff] bg-[#fff] px-4 py-0.5 font-medium shadow-inner ring-1 ring-[#e7e7e7] hover:bg-[#e7e7e7]">2/500 variants selected</button>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        spotlight.close();
                        setInputValue('');
                      }}
                      className="rounded-md border border-[#ffff] bg-[#fff] px-4 py-0.5 font-semibold shadow-inner ring-1 ring-[#e7e7e7] hover:bg-[#e7e7e7]"
                    >
                      Cancel
                    </button>
                    <button type="button" className="rounded-md border border-[#ffffff3b] bg-[#3b3b3b] px-4 py-0.5 font-semibold text-white shadow-inner ring-1 ring-[#3a3a3a] hover:bg-[#303030]">
                      Add
                    </button>
                  </div>
                </div>
              </Spotlight.Footer>
            </div>
          </div>
        </div>
      </Spotlight.Root>
    </div>
  );
};

export default SelectFromAllProductsModal;
