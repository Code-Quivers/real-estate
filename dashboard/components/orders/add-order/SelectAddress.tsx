import { useEffect, useState } from 'react';
import { CloseButton, Popover, ScrollArea, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons-react';
import axios from 'axios';

const SelectAddress = () => {
  const [dropdownOpened, { open, close, toggle }] = useDisclosure();
  const [cities, setCities] = useState<any>();
  const [zones, setZones] = useState<any[]>();
  const [areas, setAreas] = useState<any[]>();
  // !
  const [selectedCity, setSelectedCity] = useState<null | { city_name: string; city_id: number }>(null);
  const [selectedZone, setSelectedZone] = useState<null | { zone_name: string; zone_id: number }>(null);
  const [selectedArea, setSelectedArea] = useState<null | { area_name: string; area_id: number }>(null);
  //  {
  //                 "area_id": 10433,
  //                 "area_name": "Bhuiyagati Bazar",
  //                 "home_delivery_available": false,
  //                 "pickup_available": false
  //             },
  useEffect(() => {
    // Fetch the cities when the component mounts
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://api-hermes.pathao.com/aladdin/api/v1/city-list', {
          headers: {
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyMjI5IiwianRpIjoiOGUzZDBkZTQxM2ViYzMzNTRmNGI5MTliODRmOTdiOTM1MmYwY2JmMTlhMzc4MTNmNDk2OTk3YTZmMjk0ZjY2YmI2ODY3OTIwZGM1NGJkYjQiLCJpYXQiOjE3MjAzNzQ4MzguODc2MzQ4LCJuYmYiOjE3MjAzNzQ4MzguODc2MzUzLCJleHAiOjE3MjgxNTA4MzguODUxMzQxLCJzdWIiOiI4NjcwMSIsInNjb3BlcyI6W119.NL-g3dIwENZGI9yRO3M1Rl2pKlKYirb81qtGAlq_WFoZKrs3p2UTLjUAB4EcNM4ZQe-8sSr38bpyQUTzRxWuHjtz458HBUIIWMIQ0bCP7EXoWfqI5F3KASwnMQEhVYxu2k_o_LgzzRb7C_uyxDW7qijADjpVVGeEUvlAnnNuG1ej-WXAm7IhOsUFjPSjGDHqriPePbY8qtQWxI04CMjWg8yLHxjvxrnjTPySbPEdEsHf4VTTuW98JrQa73qRQSap3GtDbj4RtC8J5Uh28hkGp9LonWOv3zUkXERuy7Xk7jPMDNwkqNk3etYU4pgGlYkMdyVWfGOW88kaSKvjuR49VFBcKM2jWQZKc3LE3Qj1YZ_fE4tintOFlmz8rjnNYm9cuu5etTybOXeiZ8fm8VeolTotJpYl6EfcADqJka7TdyX5veTTsPXCqV7FUuIFFaRK7TK0d8aiZg46eiPYvhOIgSzdYlK4VfB9JpOW7fkOzPL_0ys3i55mGr2XVWBfIo1gj8sf0sKvgs9XF9mDviDCYT7vgFHixV17EMHukZqoJJHRzuCDJsGflj4vbcMoSQIwtTPZmJD4xfaRKq-PL0WTMULTQSPRtMuc46KkZxcxlSKpJ4q82IugzdM3cgAxcUoMqBWro4gueBVMnQHcTdbR3IQaw9r_KOYmVKuQAUd59FM',
          },
        });
        setCities(response?.data?.data?.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    // Fetch the cities when the component mounts
    if (selectedCity?.city_id) {
      const fetchZones = async () => {
        try {
          const response = await axios.get(`https://api-hermes.pathao.com/aladdin/api/v1/cities/${selectedCity?.city_id}/zone-list`, {
            headers: {
              Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyMjI5IiwianRpIjoiOGUzZDBkZTQxM2ViYzMzNTRmNGI5MTliODRmOTdiOTM1MmYwY2JmMTlhMzc4MTNmNDk2OTk3YTZmMjk0ZjY2YmI2ODY3OTIwZGM1NGJkYjQiLCJpYXQiOjE3MjAzNzQ4MzguODc2MzQ4LCJuYmYiOjE3MjAzNzQ4MzguODc2MzUzLCJleHAiOjE3MjgxNTA4MzguODUxMzQxLCJzdWIiOiI4NjcwMSIsInNjb3BlcyI6W119.NL-g3dIwENZGI9yRO3M1Rl2pKlKYirb81qtGAlq_WFoZKrs3p2UTLjUAB4EcNM4ZQe-8sSr38bpyQUTzRxWuHjtz458HBUIIWMIQ0bCP7EXoWfqI5F3KASwnMQEhVYxu2k_o_LgzzRb7C_uyxDW7qijADjpVVGeEUvlAnnNuG1ej-WXAm7IhOsUFjPSjGDHqriPePbY8qtQWxI04CMjWg8yLHxjvxrnjTPySbPEdEsHf4VTTuW98JrQa73qRQSap3GtDbj4RtC8J5Uh28hkGp9LonWOv3zUkXERuy7Xk7jPMDNwkqNk3etYU4pgGlYkMdyVWfGOW88kaSKvjuR49VFBcKM2jWQZKc3LE3Qj1YZ_fE4tintOFlmz8rjnNYm9cuu5etTybOXeiZ8fm8VeolTotJpYl6EfcADqJka7TdyX5veTTsPXCqV7FUuIFFaRK7TK0d8aiZg46eiPYvhOIgSzdYlK4VfB9JpOW7fkOzPL_0ys3i55mGr2XVWBfIo1gj8sf0sKvgs9XF9mDviDCYT7vgFHixV17EMHukZqoJJHRzuCDJsGflj4vbcMoSQIwtTPZmJD4xfaRKq-PL0WTMULTQSPRtMuc46KkZxcxlSKpJ4q82IugzdM3cgAxcUoMqBWro4gueBVMnQHcTdbR3IQaw9r_KOYmVKuQAUd59FM',
            },
          });
          setZones(response?.data?.data?.data);
        } catch (error) {
          console.error('Error fetching zone:', error);
        }
      };
      fetchZones();
    }
  }, [selectedCity?.city_id]);
  //
  useEffect(() => {
    // Fetch the cities when the component mounts
    if (selectedZone?.zone_id) {
      const fetchAreas = async () => {
        try {
          const response = await axios.get(`https://api-hermes.pathao.com/aladdin/api/v1/zones/${selectedZone?.zone_id}/area-list`, {
            headers: {
              Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyMjI5IiwianRpIjoiOGUzZDBkZTQxM2ViYzMzNTRmNGI5MTliODRmOTdiOTM1MmYwY2JmMTlhMzc4MTNmNDk2OTk3YTZmMjk0ZjY2YmI2ODY3OTIwZGM1NGJkYjQiLCJpYXQiOjE3MjAzNzQ4MzguODc2MzQ4LCJuYmYiOjE3MjAzNzQ4MzguODc2MzUzLCJleHAiOjE3MjgxNTA4MzguODUxMzQxLCJzdWIiOiI4NjcwMSIsInNjb3BlcyI6W119.NL-g3dIwENZGI9yRO3M1Rl2pKlKYirb81qtGAlq_WFoZKrs3p2UTLjUAB4EcNM4ZQe-8sSr38bpyQUTzRxWuHjtz458HBUIIWMIQ0bCP7EXoWfqI5F3KASwnMQEhVYxu2k_o_LgzzRb7C_uyxDW7qijADjpVVGeEUvlAnnNuG1ej-WXAm7IhOsUFjPSjGDHqriPePbY8qtQWxI04CMjWg8yLHxjvxrnjTPySbPEdEsHf4VTTuW98JrQa73qRQSap3GtDbj4RtC8J5Uh28hkGp9LonWOv3zUkXERuy7Xk7jPMDNwkqNk3etYU4pgGlYkMdyVWfGOW88kaSKvjuR49VFBcKM2jWQZKc3LE3Qj1YZ_fE4tintOFlmz8rjnNYm9cuu5etTybOXeiZ8fm8VeolTotJpYl6EfcADqJka7TdyX5veTTsPXCqV7FUuIFFaRK7TK0d8aiZg46eiPYvhOIgSzdYlK4VfB9JpOW7fkOzPL_0ys3i55mGr2XVWBfIo1gj8sf0sKvgs9XF9mDviDCYT7vgFHixV17EMHukZqoJJHRzuCDJsGflj4vbcMoSQIwtTPZmJD4xfaRKq-PL0WTMULTQSPRtMuc46KkZxcxlSKpJ4q82IugzdM3cgAxcUoMqBWro4gueBVMnQHcTdbR3IQaw9r_KOYmVKuQAUd59FM',
            },
          });
          setAreas(response?.data?.data?.data);
        } catch (error) {
          console.error('Error fetching area:', error);
        }
      };
      fetchAreas();
    }
  }, [selectedZone?.zone_id]);

  const RenderSelectOption = () => {
    return (
      <ScrollArea h={300} scrollbarSize={6}>
        <div className="border-b bg-gray-100 px-3 py-2">
          <h3>Select Area</h3>
        </div>
        <div className="space-y-1 px-3">
          {!selectedCity?.city_name &&
            cities?.map((city: any, idx: number) => (
              <div key={idx}>
                <button
                  className="flex w-full cursor-pointer items-center justify-between rounded border-b  py-1 hover:bg-[#F8F9FA]"
                  type="button"
                  onClick={() => {
                    setSelectedCity({
                      city_name: city?.city_name,
                      city_id: city?.city_id,
                    });
                  }}
                >
                  <h3 className="text-start  text-[15px]">{city?.city_name}</h3>
                  <span>
                    <IconChevronRight />
                  </span>
                </button>
              </div>
            ))}
          {selectedCity?.city_name &&
            !selectedZone?.zone_id &&
            zones?.length &&
            zones?.map((zone, idx) => (
              <div key={idx}>
                <button
                  className="flex w-full cursor-pointer items-center justify-between rounded border-b  py-1 hover:bg-[#F8F9FA]"
                  type="button"
                  onClick={() => {
                    setSelectedZone({
                      zone_name: zone?.zone_name,
                      zone_id: zone?.zone_id,
                    });
                  }}
                >
                  <h3 className="text-start text-[15px]">{zone?.zone_name}</h3>
                  <span>
                    <IconChevronRight />
                  </span>
                </button>
              </div>
            ))}
          {selectedZone?.zone_id &&
            areas?.length &&
            areas?.map((area, idx) => (
              <div key={idx}>
                <button
                  className="flex w-full cursor-pointer items-center justify-between rounded border-b  py-1 hover:bg-[#F8F9FA]"
                  type="button"
                  onClick={() => {
                    setSelectedArea({
                      area_name: area?.area_name,
                      area_id: area?.area_id,
                    });
                    close();
                  }}
                >
                  <h3 className="text-start  text-[15px]">{area?.area_name}</h3>
                  <span>
                    <IconChevronRight />
                  </span>
                </button>
              </div>
            ))}
        </div>
      </ScrollArea>
    );
  };

  return (
    <>
      <Popover shadow="lg" radius="md" withArrow width="target" opened={dropdownOpened} onChange={toggle}>
        <Popover.Target>
          <Textarea
            onFocus={open}
            mt={'xs'}
            minRows={1}
            value={selectedCity ? `${selectedCity.city_name} ➤ ${selectedZone ? selectedZone.zone_name + ' ➤ ' : ''}${selectedArea ? selectedArea.area_name : ''}` : ''}
            maxRows={10}
            autosize
            placeholder="Delivery area"
            size="md"
            rightSection={
              <CloseButton
                type="button"
                aria-label="Clear input"
                onClick={() => {
                  setSelectedCity(null);
                  setSelectedZone(null);
                  setSelectedArea(null);
                }}
                style={{ display: selectedCity?.city_id ? undefined : 'none' }}
              />
            }
          />
        </Popover.Target>
        <Popover.Dropdown p={0}>
          <RenderSelectOption />
        </Popover.Dropdown>
      </Popover>
    </>
  );
};

export default SelectAddress;
