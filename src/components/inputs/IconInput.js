import React, { useState } from 'react';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";


const IconInput = ({ placeholder, onchange, stateValue }) => {
    const [inputType, setInputType] = useState('password');
    function handleInputTypeChange() {
        if (inputType === 'text') {
            setInputType('password')
        } else {
            setInputType('text')
        }
    }
    return (
        <div className='px-4 w-full h-16 border border-[#E2E8F0] rounded-md bg-transparent flex flex-row justify-center items-center'>
            <input type={inputType} placeholder={placeholder} onChange={(e) => { onchange(e.target.value) }} value={stateValue} className='w-11/12 outline-none' />
            {
                inputType === 'password' &&
                <FaRegEyeSlash size={18} color='#808D9E' className='w-1/12 cursor-pointer' onClick={handleInputTypeChange}/>
            }
            {
                inputType === 'text' &&
                <FaRegEye size={18} color='#808D9E' className='w-1/12 cursor-pointer' onClick={handleInputTypeChange} />
            }
        </div>
    );
}

export default IconInput;
