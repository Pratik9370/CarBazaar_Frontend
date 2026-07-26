import React from 'react';
import { CarCard } from './CarCard';

export default function SpecificCars({ cars, heading }) {

  return (
    <>
    {
      cars.length > 0 &&
        <section className="bg-white rounded-2xl border border-[#E8E6E1] pt-6 pb-2 min-w-0">

          <div className="mx-auto min-w-0">

            {/* Section Header */}
            <div className="flex items-center justify-between px-5 mb-5">
              <h2 className="font-serif text-xl md:text-2xl text-[#14161A]">{heading}</h2>
              <span className="font-mono text-[11px] uppercase tracking-wide text-[#6B6D72]">
                {cars.length} {cars.length === 1 ? "car" : "cars"}
              </span>
            </div>

            {/* Slider Wrapper */}
            <div className="relative pb-5 min-w-0">

              {/* Horizontal Slider */}
              <div
                className="flex gap-4 overflow-x-auto h-full scrollbar-hide scroll-smooth px-5 snap-x snap-mandatory"
              >
                {cars.map((car) => (
                  <div
                    key={car._id}
                    className="snap-start w-[250px] h-full md:w-[300px] flex-shrink-0 py-1"
                  >
                    <CarCard
                      car={car}
                    />
                  </div>
                ))}
              </div>

              {/* Edge fade to hint scrollability */}
              <div className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-white to-transparent"></div>

            </div>

          </div>

        </section>
    }
    </>
  );
}