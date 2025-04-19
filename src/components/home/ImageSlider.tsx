import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade  } from "swiper/modules";
import "swiper/css";
import 'swiper/css/effect-fade';
const slides = [
  {
    image: "/assets/images/slide-img-1.jpg",
    title: "First Slide",
    description: "This is the first slide description.",
  },
  {
    image: "/assets/images/slide-img-2.jpg",
    title: "Second Slide",
    description: "This is the second slide description.",
  },
  {
    image: "/assets/images/slide-img-3.jpg",
    title: "Third Slide",
    description: "This is the third slide description.",
  },
];

export default function ImageSlider() {
  return (
    <Swiper
      modules={[Autoplay, EffectFade ]}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      loop={true}
      effect="fade"
      fadeEffect={{ crossFade: true }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative w-full bg-cover bg-center h-[70vh] SlideBg"
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
