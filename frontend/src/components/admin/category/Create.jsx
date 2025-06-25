import React, { useState } from 'react';
import Layout from '../../common/Layout';
import Sidebar from '../../common/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiUrl, adminToken } from '../../common/http';

const Create = () => {
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const saveCategory = async (data) => {
        setDisable(true);
        console.log(data);

        try {
            const response = await fetch(`${apiUrl}/categories`, {
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
                navigate('/admin/categories');
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
                    <div className='col-12 d-flex justify-content-between mt-5 pb-3'>
                        <h4 className='h4 pb-0 mb-0'>Categories / Create</h4>
                        <Link to="/admin/categories" className="btn btn-primary">Back</Link>
                    </div>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9'>
                        <form onSubmit={handleSubmit(saveCategory)}>
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
    );
};

export default Create;
