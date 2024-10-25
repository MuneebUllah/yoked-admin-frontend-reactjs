import React, { useState } from 'react';
import yoked from '../../assets/images/yoked.png';
import logo from '../../assets/images/logo.png';
import Textinput from '../../components/inputs/Textinput';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import IconInput from '../../components/inputs/IconInput';
import LoginUseHook from './useHook';

const Login = () => {
    const [formData, setFormData] = useState({
        emailOrUsername: '',
        password: ''
    });

    const { SignIn } = LoginUseHook();

    function handleSubmit(event) {
        event.preventDefault();
        SignIn(formData);
    }

    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    return (
        <div className='h-screen w-full flex flex-row'>
            <div
                className='bg-green-500 h-full w-[50%] xl:w-[55%] flex items-center justify-center'
                style={{ backgroundImage: `url(/img/loginBg.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className='w-full h-full flex items-center justify-center'>
                    <img src={logo} alt='yoked' className='w-60 h-60' />
                </div>
            </div>
            <div className='h-full w-[50%] xl:w-[45%] flex items-center justify-center'>
                <div className='w-full xl:w-[80%] px-12'>
                    <img src={yoked} alt='yoked' className='w-40 h-12' />
                    <div className='py-8 w-full mx-auto'>
                        <h1 className='font-bold text-3xl my-2'>Sign In to your Account</h1>
                        <p className='text-base text-[#808D9E]'>Welcome back! please enter your details</p>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-5 pt-8 pb-4'>
                            <Textinput
                                placeholder={'Email'}
                                onchange={(value) => handleChange('emailOrUsername', value)}
                                stateValue={formData.emailOrUsername}
                            />
                            <IconInput
                                placeholder={'Password'}
                                onchange={(value) => handleChange('password', value)}
                                stateValue={formData.password}
                            />
                            <div className='flex flex-row gap-4 ps-1 items-center mb-5'>
                                <input type='checkbox' className='w-5 h-5' />
                                <h1 className='font-medium text-sm'>Remember me</h1>
                            </div>
                            <PrimaryButton title={'Login'} round={'full'} width={'100%'} fill={true} fillColor={'blue'} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
