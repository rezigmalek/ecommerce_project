import React, { useEffect, useState, useRef, useMemo } from 'react'
import Layout from '../../common/Layout'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { apiUrl, adminToken } from '../../common/http'
import JoditEditor from 'jodit-react';

const Create = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [disable, setDisable] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();

    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Enter description...'
    }), []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm();

    const saveProduct = async (data) => {
        setDisable(true);
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('price', data.price);
        formData.append('category', data.category);
        formData.append('brand', data.brand);
        formData.append('short_description', data.short_description);
        formData.append('description', content);
        formData.append('sku', data.sku);
        formData.append('barcode', data.barcode);
        formData.append('qty', data.qty);
        formData.append('status', data.status);
        formData.append('is_featured', data.is_featured || 0);

        // image upload (premier fichier seulement)
        if (data.image && data.image[0]) {
            formData.append('image', data.image[0]);
        }

        // si tu as une gallery[] à envoyer (IDs de TempImage)
        // Exemple : gallery = [12, 13]
        // gallery.forEach(id => formData.append('gallery[]', id));

        try {
            const response = await fetch(`${apiUrl}/products`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${adminToken()}`, // PAS de Content-Type ici, FormData le fait tout seul
                },
                body: formData
            });

            const result = await response.json();
            setDisable(false);

            if (response.status === 201) {
                toast.success(result.message || 'Product created successfully');
                navigate('/admin/products');
            } else if (result.errors) {
                Object.keys(result.errors).forEach((field) => {
                    setError(field, {
                        type: 'manual',
                        message: result.errors[field][0]
                    });
                });
            } else {
                toast.error(result.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Network error:', error);
            setDisable(false);
            toast.error('Network error. Please try again.');
        }
    };


    const fetchCategories = async () => {
        try {
            const response = await fetch(`${apiUrl}/categories`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                },
            });
            const result = await response.json();
            setCategories(result.data);
        } catch (error) {
            console.error('Failed to load categories:', error);
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await fetch(`${apiUrl}/brands`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                },
            });
            const result = await response.json();
            setBrands(result.data);
        } catch (error) {
            console.error('Failed to load brands:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, []);

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className='h4 pb-0 mb-0'>Products / Create</h4>
                        <Link to="/admin/products" className="btn btn-primary">Back</Link>
                    </div>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9'>
                        <form onSubmit={handleSubmit(saveProduct)} encType="multipart/form-data">
                            <div className='card shadow'>
                                <div className="card-body p-4">
                                    <div className='mb-3'>
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input
                                            id="title"
                                            type="text"
                                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                            placeholder="Enter title"
                                            {...register('title', {
                                                required: 'The title field is required'
                                            })}
                                        />
                                        {errors.title && (
                                            <span className='text-danger'>{errors.title.message}</span>
                                        )}
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label className="form-label">Category</label>
                                                <select
                                                    className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                                                    {...register('category', {
                                                        required: 'Please select a category'
                                                    })}
                                                >
                                                    <option value="">Select a category</option>
                                                    {
                                                        categories.map((category) => (
                                                            <option key={category.id} value={category.id}>{category.name}</option>
                                                        ))
                                                    }
                                                </select>
                                                {errors.category && (
                                                    <span className='text-danger'>{errors.category.message}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label className="form-label">Brand</label>
                                                <select
                                                    className={`form-control ${errors.brand ? 'is-invalid' : ''}`}
                                                    {...register('brand', {
                                                        required: 'Please select a brand'
                                                    })}
                                                >
                                                    <option value="">Select a brand</option>
                                                    {
                                                        brands.map((brand) => (
                                                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                                                        ))
                                                    }
                                                </select>
                                                {errors.brand && (
                                                    <span className='text-danger'>{errors.brand.message}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mb-3'>
                                        <label className="form-label">Short Description</label>
                                        <textarea
                                            className={`form-control ${errors.short_description ? 'is-invalid' : ''}`}
                                            placeholder='Short Description'
                                            rows={3}
                                            {...register('short_description', {
                                                required: 'Short description is required'
                                            })}
                                        ></textarea>
                                        {errors.short_description && (
                                            <span className='text-danger'>{errors.short_description.message}</span>
                                        )}
                                    </div>

                                    <div className='mb-3'>
                                        <label className="form-label">Description</label>
                                        <JoditEditor className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                            ref={editor}
                                            value={content}
                                            config={config}
                                            tabIndex={1}
                                            onBlur={newContent => setContent(newContent)}
                                            {...register('description', {
                                            })}
                                        />
                                    </div>

                                    <h3 className="py-3 border-bottom mb-3">Pricing</h3>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label className="form-label">Price</label>
                                                <input
                                                    type='text'
                                                    placeholder='Price'
                                                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                                    {...register('price', {
                                                        required: 'Price field is required',
                                                        pattern: {
                                                            value: /^[0-9]+(\.[0-9]{1,2})?$/,
                                                            message: 'Enter a valid price'
                                                        }
                                                    })}
                                                />
                                                {errors.price && <span className="text-danger">{errors.price.message}</span>}
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label className="form-label">Discounted Price</label>
                                                <input
                                                    type='text'
                                                    placeholder='Discounted Price'
                                                    className={`form-control ${errors.discounted_price ? 'is-invalid' : ''}`}
                                                    {...register('compare_price', {
                                                        pattern: {
                                                            value: /^[0-9]+(\.[0-9]{1,2})?$/,
                                                            message: 'Enter a valid price'
                                                        }
                                                    })}
                                                />
                                                {errors.discounted_price && <span className="text-danger">{errors.discounted_price.message}</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="py-3 border-bottom mb-3">Inventory</h3>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label className="form-label">SKU</label>
                                                <input
                                                    type='text'
                                                    placeholder='Sku'
                                                    className={`form-control ${errors.sku ? 'is-invalid' : ''}`}
                                                    {...register('sku', {
                                                        required: 'SKU field is required'
                                                    })}
                                                />
                                                {errors.sku && <span className="text-danger">{errors.sku.message}</span>}
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label className="form-label">Barcode</label>
                                                <input
                                                    type='text'
                                                    placeholder='Barcode'
                                                    className={`form-control ${errors.barcode ? 'is-invalid' : ''}`}
                                                    {...register('barcode', {
                                                        required: 'Barcode field is required'
                                                    })}
                                                />
                                                {errors.barcode && <span className="text-danger">{errors.barcode.message}</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label className="form-label">Quantity</label>
                                                <input
                                                    type='text'
                                                    placeholder='Quantity'
                                                    className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                                                    {...register('qty', {
                                                        required: 'Quantity is required',
                                                        pattern: {
                                                            value: /^[0-9]+$/,
                                                            message: 'Quantity must be a valid integer'
                                                        }
                                                    })}
                                                />
                                                {errors.quantity && <span className="text-danger">{errors.quantity.message}</span>}
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
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
                                                    <option value="0">Blocked</option>
                                                </select>
                                                {errors.status && (
                                                    <span className='text-danger'>{errors.status.message}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="status" className="form-label">Featured</label>
                                            <select
                                                id="status"
                                                className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                                                {...register('is_featured', {
                                                })} >
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                    </div>

                                    <h3 className="py-3 border-bottom mb-3">Gallery</h3>
                                    <div className='mb-3'>
                                        <label className="form-label">Image</label>
                                        <input
                                            type='file'
                                            className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                                            {...register('image', {
                                                required: 'Product image is required'
                                            })}
                                        />
                                        {errors.image && <span className="text-danger">{errors.image.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <button disabled={disable} type='submit' className='btn btn-primary mt-3 mb-5'>Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Create;
