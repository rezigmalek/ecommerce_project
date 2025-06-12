import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderOneImg from '../../assets/images/banner-1.jpg';
import SliderTwoImg from '../../assets/images/banner-2.jpg';
import "swiper/css";
const Hero = () => {
  return (
    <section className='section-1'>
        <Swiper
            spaceBetween={0}
            slidesPerView={1}          
            breakpoints={{
                1024: {
            slidesPerView: 1,
            spaceBetween: 0,
            },
        }}
  >               
    <SwiperSlide>
        <div className="content" style={{ backgroundImage: `url(${SliderOneImg})` }}>                        
        </div>                   
    </SwiperSlide>
    <SwiperSlide>
        <div className="content" style={{ backgroundImage: `url(${SliderTwoImg})` }}>                        
        </div>
    </SwiperSlide>                
</Swiper>
      </section>
  )
}

export default Hero
