"use client";
import React, { useState } from "react";
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
import p1 from "@/public/images/p1.jpg";
import p2 from "@/public/images/p2.jpg";
import p3 from "@/public/images/p3.png";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    message: "“Knowing My Hard Work is Counted”",
    story:
      "SolarHope Africa has transformed my life by providing sustainable energy solutions to my village. We now have access to electricity, which has improved our quality of life immensely.",
    image: p1.src,
    work: "Farmer",
  },
  {
    id: 2,
    name: "Jane Smith",
    message: "“Knowing My Hard Work is Counted”",
    story:
      "Thanks to SolarHope Africa, our school is now powered by solar energy. This has allowed us to extend our learning hours and improve the education of our children.",
    image: p2.src,
    work: "Teacher",
  },
  {
    id: 3,
    name: "Samuel Kofi",
    message: "“Knowing My Hard Work is Counted”",
    story:
      "The solar clinic initiative has been a game changer for our community. We now have reliable power for medical equipment, which saves lives every day.",
    image: p3.src,
    work: "Healthcare Worker",
  },
];

const TestimonialSection = () => {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const { name, message, story, image, work } = testimonials[current];

  return (
    <div className="bg-white text-[#637083]">
      <div className="max-w-[1570px] mx-auto p-8 sm:p-28">
        <div className="bg-[#F2F4F7] p-8 md:p-20 rounded-lg flex flex-col md:flex-row items-stretch gap-8 lg:gap-16 min-h-[400px]">
          {/* Left section */}
          <div className="flex flex-col justify-between md:w-1/2">
            <div className="space-y-4">
              <h1 className="text-yellow font-bold text-xl">
                Our Member’s Stories
              </h1>
              <p>
                Here’s what beneficiaries say about SolarHope Africa. Real
                moments, real experiences, real stories.
              </p>
            </div>
            <div className="mt-auto flex items-center text-3xl gap-4 pt-6">
              <button onClick={prevSlide} aria-label="Previous">
                <SlArrowLeftCircle className="hover:text-black transition duration-200" />
              </button>
              <button onClick={nextSlide} aria-label="Next">
                <SlArrowRightCircle className="hover:text-black transition duration-200" />
              </button>
            </div>
          </div>

          {/* Right section */}
          <div className="md:w-1/2 text-center md:text-left space-y-4 flex flex-col justify-between">
            <h3 className="font-semibold text-black text-4xl">{message}</h3>
            <p className="text-sm italic">"{story}"</p>
            <div className="flex items-start lg:items-center justify-start gap-4">
              <img
                src={image}
                alt={name}
                className="w-14 h-14 rounded-full object-cover border-3 border-[#DFDDFCB2] shadow-sm"
              />
              <div>
                <p className="font-bold text-md text-[#17122B] mt-2">{name}</p>
                <span className="text-sm text-gray-500 ml-2">{work}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
