import React from 'react'
import ProductImg1 from '../../assets/images/Mens/eight.jpg';
import ProductImg2 from '../../assets/images/Mens/twelve.jpg';
import ProductImg3 from '../../assets/images/Mens/two.jpg';
import ProductImg4 from '../../assets/images/Mens/four.jpg';

const LatestProducts = () => {
  return (
        <section className='section-2 pt-5'>
                <div className='container'>
                  <h2>New arrivals</h2>
                  <div className='row mt-4'>
                    <div className='col-md-3 col-6'>
                      <div className='product card border-0'>
                        <div className='card-img'>
                          <img src={ProductImg1} alt="" className='w-100'/>
                        </div>
                        <div className='card-body pt-3'>
                          <a href="">chemise à carreaux</a>
                          <div className='price'>
                            4500.00 DA <span className='text-decoration-line-through'>5200.00 DA</span>
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
                          <a href="">Chemise</a>
                          <div className='price'>
                            8900.00 DA <span className='text-decoration-line-through'>9900.00 DA</span>
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
                          <a href="">lunettes de soleil</a>
                          <div className='price'>
                            4800.00 DA <span className='text-decoration-line-through'>6200.00 DA</span>
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
                          <a href="">sweat sans capuche</a>
                          <div className='price'>
                            4200.00 DA <span className='text-decoration-line-through'>5800.00 DA</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
  )
}

export default LatestProducts
