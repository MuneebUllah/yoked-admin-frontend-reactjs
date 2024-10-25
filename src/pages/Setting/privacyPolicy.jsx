import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useSetting from './useHook';

export default function PrivacyPolicy() {
    const [data, setData] = useState({
        heading: '',
        content: '',
    });

    const { privacyPolicy ,getPrivacyPolicy , patchPrivacyPolicy } = useSetting();


    useEffect(()=>{
        getPrivacyPolicy(setData)
    },[])

    const handleTitleChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            heading: e.target.value,
        }));
    };

    const handleContentChange = (value) => {
        setData((prevData) => ({
            ...prevData,
            content: value,
        }));
    };

    const update = () => {
        if(data.length > 0){
            patchPrivacyPolicy(data)
        }else{
        privacyPolicy(data);
    }
    };

    return (
        <div className='w-[30rem] pt-8 flex flex-col gap-8'>
            <div className='flex gap-4 items-center'>
                <h1>Title</h1>
                <input
                    type='text'
                    id="title"
                    name="title"
                    value={data.heading}
                    onChange={handleTitleChange}
                    className="w-full border-2 h-11 rounded-xl ps-4"
                />
            </div>
            <div>
                <h1>Description</h1>
                <ReactQuill
                    theme="snow"
                    value={data.content}
                    onChange={handleContentChange}
                    className="w-full h-56 rounded-xl mt-4"
                />
            </div>
            <div className="w-full pt-14">
                <button className="bg-[#156A3D] text-white px-12 py-3 rounded-3xl inter font-bold text-sm" onClick={update}>Update</button>
            </div>
        </div>
    );
}
