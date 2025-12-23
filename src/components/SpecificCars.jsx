import React from 'react';
import { CarCard } from './CarCard';

export default function SpecificCars({ cars, heading }) {

  return (
    <>
    {
      cars.length > 0 &&
        <section className="pt-4 bg-white md:rounded-2xl my-4 mt-8 lg:mx-18 shadow-xl border border-gray-300">

          <div className="mx-auto">

            {/* Section Header */}
            <h2 className="text-2xl px-4 font-semibold mb-6">{heading} </h2>

            {/* Slider Wrapper */}
            <div className="relative mt-2 pb-4 md:px-2">

              {/* Horizontal Slider */}
              <div

                className="flex gap-4 overflow-x-auto h-full scrollbar-hide scroll-smooth px-4"
              >
                {cars.map((car) => (
                  <div
                    key={car._id}
                    className="snap-start w-[250px] h-full md:w-[320px] flex-shrink-0 py-2"
                  >
                    <CarCard
                      car={car}
                    />
                  </div>
                ))}
              </div>

            </div>

          </div>

        </section>
    }
    </>
  );
}
