import React from 'react'
import Layout from '../../common/Layout'
import { Link } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { apiUrl } from '../../common/http'
import { adminToken } from '../../common/http'
import { toast } from 'react-toastify'

const Create = () => {

    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const saveBrand = async (data) => {
        setDisable(true);

        try {
            const response = await fetch(`${apiUrl}/brands`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            setDisable(false);

            if (response.status === 200) {
                toast.success(result.message || 'Category created successfully');
                navigate('/admin/brands');
            } else {
                toast.error(result.message || 'Something went wrong');
                console.log('Server error:', result);
            }
        } catch (error) {
            setDisable(false);
            toast.error('Network error. Please try again.');
            console.error('Network error:', error);
        }
    };

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className='h4 pb-0 mb-0'>Brands / Create</h4>
                        <Link to="/admin/brands" className="btn btn-primary">Back</Link>
                    </div>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9'>
                        <form onSubmit={handleSubmit(saveBrand)}>
                            <div className='card shadow'>
                                <div className="card-body p-4">
                                    <div className='mb-3'>
                                        <label htmlFor="categoryName" className="form-label">Name</label>
                                        <input
                                            id="categoryName"
                                            type="text"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            placeholder="Enter category name"
                                            {...register('name', {
                                                required: 'The name field is required'
                                            })}
                                        />
                                        {errors.name && (
                                            <span className='text-danger'>{errors.name.message}</span>
                                        )}
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor="status" className="form-label">Status</label>
                                        <select
                                            id="status"
                                            className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                                            {...register('status', {
                                                required: 'The status field is required'
                                            })}
                                        >
                                            <option value="">Select a status</option>
                                            <option value="1">Active</option>
                                            <option value="0">Block</option>
                                        </select>
                                        {errors.status && (
                                            <span className='text-danger'>{errors.status.message}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button disabled={disable} type='submit' className='btn btn-primary mt-3'>Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Create
