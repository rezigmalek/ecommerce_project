import React from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom';
import ProductImg from '../assets/images/Mens/eight.jpg';
import { useState } from 'react';

const Checkout = () => {
    const [payementMethode, setPayementMethode] = useState('cod');

    const handlePayementMethod = (e) => {
        setPayementMethode(e.target.value);
    }
    return (
        <Layout>
            <div className='container pb-5'>
                <div className='row'>
                    <div className='col-md-12'>
                        <nav aria-label="breadcrumb" className='py-4'>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li class="breadcrumb-item" aria-current="page">Checkout</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-7'>
                        <h3 className='border-bottom pb-3'><strong>Billind details</strong></h3>
                        <form>
                            <div className='row pt-3'>
                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                        <input type="text" className='form-control' placeholder='Name' />
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                        <input type="text" className='form-control' placeholder='Email' />
                                    </div>
                                </div>

                                <div className='mb-3'>
                                    <textarea className='form-control' rows={3} placeholder='Address'></textarea>
                                </div>

                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                        <input type="text" className='form-control' placeholder='City' />
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                        <input type="text" className='form-control' placeholder='State' />
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                        <input type="text" className='form-control' placeholder='Zip' />
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                        <input type="text" className='form-control' placeholder='Mobile' />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='col-md-5'>
                        <h3 className='border-bottom pb-3'><strong>Items</strong></h3>
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td width={100}>
                                        <img src={ProductImg} width={80} />
                                    </td>
                                    <td width={600}>
                                        <h4>Dummy product title</h4>
                                        <div className='d-flex align-items-center pt-3'>
                                            <span>$10.00</span>
                                            <div className='ps-3'>
                                                <button className='btn btn-size'>S</button>
                                            </div>
                                            <div className='ps-5'>
                                                X 1
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td width={100}>
                                        <img src={ProductImg} width={80} />
                                    </td>
                                    <td width={600}>
                                        <h4>Dummy product title</h4>
                                        <div className='d-flex align-items-center pt-3'>
                                            <span>$10.00</span>
                                            <div className='ps-3'>
                                                <button className='btn btn-size'>S</button>
                                            </div>
                                            <div className='ps-5'>
                                                X 1
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='d-flex justify-content-between border-bottom pb-2'>
                                    <div>Subtotal</div>
                                    <div>$20.00</div>
                                </div>

                                <div className='d-flex justify-content-between border-bottom py-2'>
                                    <div>Shipping</div>
                                    <div>$3.00</div>
                                </div>

                                <div className='d-flex justify-content-between border-bottom py-2'>
                                    <div><strong>Grand Total</strong></div>
                                    <div>$23.00</div>
                                </div>
                            </div>
                        </div>
                        <h3 className='border-bottom pt-4 pb-3'><strong>Payement Method</strong></h3>
                        <div>
                            <input type="radio" onClick={handlePayementMethod} name='payment' checked={payementMethode == 'stripe'} value={'stripe'} id='stripe' />
                            <label htmlFor='stripe' className='ps-2'>Stripe</label>
                            <input type="radio" onClick={handlePayementMethod} name='payment' checked={payementMethode == 'cod'} value={'cod'} id='cod' className='ms-4' />
                            <label htmlFor='cod' className='ps-2'>COD</label>
                        </div>
                        <div className='d-flex py-3'>
                            <button className='btn btn-primary'>Pay Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Checkout
