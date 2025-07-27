import React from 'react';
import ProductImg1 from '../../assets/images/Mens/eleven.jpg';
import ProductImg2 from '../../assets/images/Mens/nine.jpg';
import ProductImg3 from '../../assets/images/Mens/six.jpg';
import ProductImg4 from '../../assets/images/Mens/five.jpg';

const FeaturedProducts = () => {
  return (
        <section className='section-2 py-5'>
                        <div className='container'>
                          <h2>Featured Products</h2>
                          <div className='row mt-4'>
                            <div className='col-md-3 col-6'>
                              <div className='product card border-0'>
                                <div className='card-img'>
                                  <img src={ProductImg1} alt="" className='w-100'/>
                                </div>
                                <div className='card-body pt-3'>
                                  <a href="">Tricot avec manches</a>
                                  <div className='price'>
                                    3600.00 DA <span className='text-decoration-line-through'>4800.00 DA</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-3 col-6'>
                              <div className='product card border-0'>
                                <div className='card-img'>
                                  <img src={ProductImg2} alt="" className='w-100'/>
                                </div>
                                <div className='card-body pt-3'>
                                  <a href="">Veste Jean</a>
                                  <div className='price'>
                                    4200.00 DA <span className='text-decoration-line-through'></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-3 col-6'>
                              <div className='product card border-0'>
                                <div className='card-img'>
                                  <img src={ProductImg3} alt="" className='w-100'/>
                                </div>
                                <div className='card-body pt-3'>
                                  <a href="">T-shirt</a>
                                  <div className='price'>
                                    2200.00 DA <span className='text-decoration-line-through'>2800.00 DA</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-3 col-6'>
                              <div className='product card border-0'>
                                <div className='card-img'>
                                  <img src={ProductImg4} alt="" className='w-100'/>
                                </div>
                                <div className='card-body pt-3'>
                                  <a href="">Veste cuir</a>
                                  <div className='price'>
                                    7200.00 DA <span className='text-decoration-line-through'>9200.00 DA</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
        </section>
  )
}

export default FeaturedProducts
