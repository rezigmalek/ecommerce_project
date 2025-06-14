import React, { useContext } from 'react'
import Layout from '../common/Layout'
import { useForm } from 'react-hook-form'
import { apiUrl } from '../common/http';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuth';


const Login = () => {
    const {login} = useContext(AdminAuthContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);

        const res = fetch(`${apiUrl}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            if (result.status == 200) {
                const adminInfo = {
                    token: result.token,
                    id: result.id,
                    name: result.name,
                }
                localStorage.setItem('adminInfo', JSON.stringify(adminInfo));

                login(adminInfo);

                navigate('/admin/dashboard');


                // localStorage.setItem('adminToken', result.token);
                // window.location.href = '/admin/dashboard';
            } else {
                toast.error(result.message);
            }
            
        })
    }

    return (
        <Layout>
            <div className='container d-flex justify-content-center py-5'>
                <form onSubmit={handleSubmit(onSubmit)} className='col-md-4'>
                    <div className='card shadow border-0 login'>
                        <div className='card-body p-4'>
                            <h3 className='text-center mb-4'>Admin Login</h3>
                            <div className='mb-3'>
                                <label htmlFor="email" className='form-label'>Email</label>
                                <input
                                    id="email"
                                    placeholder='Enter your email'
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    {
                                    ...register('email', {
                                        required: "The email field is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })
                                    }
                                />
                                {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="password" className='form-label'>Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder='Enter your password'
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    {...register('password', { required: 'Password is required' })}
                                />
                                {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                            </div>
                            <button type="submit" className='btn btn-secondary w-100'>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Login
