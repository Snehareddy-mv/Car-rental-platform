import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Testimonial = () => {
  const testimonials = [
    {
      name: "VReddy",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      review:
        "Renting a luxury car through Stayventure was an absolute delight! The booking process was seamless, the car was spotless, and the pickup was right on time. It made my trip in Barcelona unforgettable.",
    },
    {
      name: "Sandeep",
      location: "New York, USA",
      image: assets.testimonial_image_2,
      review:
        "I have used several rental services before, but none compare to this one. The car was in excellent condition, insurance was handled without hassle, and the drop-off process was quick and easy. Highly recommend!",
    },
    {
      name: "Suguna",
      location: "Hyderabad,India",
      image: assets.testimonial_image_1,
      review:
        "A fantastic experience from start to finish. The team verified the driver details carefully, and I felt completely secure. Driving around Seoul in a luxury car was a dream come true!",
    },
    {
      name: "Sneha",
      location: "Bangalore,India",
      image: assets.testimonial_image_2,
      review:
        "I rented an Audi A6 for a wedding, and the service exceeded expectations. The car was spotless, insurance fully covered, and the chauffeur option made the event stress-free. All my friends were impressed!",
    },
    {
      name: "Rakshitha",
      location: "Rome,Italy",
      image: assets.testimonial_image_2,
      review:
        "A fantastic experience from start to finish. The team verified the driver details carefully, and I felt completely secure. Driving around Seoul in a luxury car was a dream come true!",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 py-28 md:px-16 lg:px-24 xl:px-44"
    >
      <Title
        title="What Our Customers Say"
        subTitle="Discover why discerning travelers choose stayventure for their luxury accomdations around the world."
      />

      <div className="grid grid-cols-1 mt-18 gap-10 sm:grid-cols-2 lg:grid-cols-3 ">
        {testimonials.map((testimonial, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img key={index} src={assets.star_icon} alt="star-icon" />
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.review}"
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonial;
