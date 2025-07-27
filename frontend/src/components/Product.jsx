import React from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import { Rating } from 'react-simple-star-rating';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import ProductImgOne from '../assets/images/Mens/five.jpg';
import ProductImgTwo from '../assets/images/Mens/six.jpg';
import ProductImgThree from '../assets/images/Mens/seven.jpg';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Product = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [rating, setRating] = useState(4);

    return (
        <Layout>
            <div className='container product-detail'>
                <div className='row'>
                    <div className='col-md-12'>
                        <nav aria-label="breadcrumb" className='py-4'>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li class="breadcrumb-item active" aria-current="page"><Link to="/shop">Shop</Link></li>
                                <li class="breadcrumb-item" aria-current="page">Dummy product title</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className='row mb-5'>
                    <div className='col-md-5'>
                        <div className='row'>
                            <div className='col-2'>
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#000',
                                        '--swiper-pagination-color': '#000',
                                    }}
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    direction={`vertical`}
                                    spaceBetween={10}
                                    slidesPerView={6}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper mt-2"
                                >

                                    <SwiperSlide>
                                        <div className='content'>
                                            <img
                                                src={ProductImgOne}
                                                alt=""
                                                height={100}
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className='content'>
                                            <img
                                                src={ProductImgTwo}
                                                alt=""
                                                height={100}
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className='content'>
                                            <img
                                                src={ProductImgThree}
                                                alt=""
                                                height={100}
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                            <div className='col-10'>
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#000',
                                        '--swiper-pagination-color': '#000',
                                    }}
                                    loop={true}
                                    spaceBetween={0}
                                    navigation={true}
                                    thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                >

                                    <SwiperSlide >
                                        <div className='content'>
                                            <img
                                                src={ProductImgOne}
                                                alt=""
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide >
                                        <div className='content'>
                                            <img
                                                src={ProductImgTwo}
                                                alt=""
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide >
                                        <div className='content'>
                                            <img
                                                src={ProductImgThree}
                                                alt=""
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>

                            </div>
                        </div>
                    </div>
                    <div className='col-md-7'>
                        <h2>Veste cuir</h2>
                        <div className='d-flex'>
                            <Rating
                                size={20}
                                readonly
                                initialValue={rating}
                            />
                            <span className='pt-1 ps-2'>10 Reviews</span>
                        </div>
                        <div className='price h3 py-3'>
                            7800.00 DA <span className='text-decoration-line-through'>9800.00 DA</span>
                        </div>
                        <div>
                            Lorem ipsum dolor sit, amet consec adipisicing <br />elit. Cupiditate, quo repellendus. Possimus officia distinctio, beatae odit ducimus pariatur hic aut laudantium sed sunt? Repellat debitis accusamus ipsa ex necessitatibus velit?
                        </div>


                        <div className='pt-3'>
                            <strong className='pt-3'>Select size</strong>

                            <div className='sizes pt-2'>
                                <button className='btn btn-size'>S</button>
                                <button className='btn btn-size ms-1'>M</button>
                                <button className='btn btn-size ms-1'>L</button>
                                <button className='btn btn-size ms-1'>XL</button>
                            </div>
                        </div>

                        <div className='add-to-cart my-4'>
                            <button className='btn btn-primary text-uppercase'>Add to cart</button>
                        </div>
                        <hr />
                        <div>
                            <strong>SKU: </strong>
                            DDXX1234
                        </div>

                    </div>
                </div>
                <div className='row pb-5'>
                    <div className='col-md-12'>
                        <Tabs
                            defaultActiveKey="profile"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="description" title="Description">
                                Tab content for Description
                            </Tab>
                            <Tab eventKey="reviews" title="Reviews (10)">
                                Reviews Area
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product
