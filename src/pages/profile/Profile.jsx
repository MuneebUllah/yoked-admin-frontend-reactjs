import React, { useRef, useState, useEffect } from "react";
import yoked from '../../assets/images/yoked.png';
import { BsPencil } from "react-icons/bs";
import useProfile from "./useHook";
import dummyImg from '../../assets/images/dummy-profile-pic.png'
import { updateProfileAsync } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { storage } from "../../components/Firebase/Firebase-config";  
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";  

export const Profile = () => {
    const [user, setUser] = useState();
    const { profileUpdate, userProfile } = useProfile();
    const fileInputRef = useRef(null);

    const [profileImage, setProfileImage] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '' });
    const dispatch = useDispatch()
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('adminDetail')) || null;
        if (storedUser) setUser(storedUser);
    }, []);

    useEffect(() => {
        userProfile();
            setFormData({ name: user?.username, email: user?.email });
            setProfileImage(user?.image || dummyImg)
    }, [user]);

    const handleImageClick = () => fileInputRef.current.click();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const storageRef = ref(storage, `profile-images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // You can handle progress updates here if needed
                },
                (error) => {
                    console.error("Upload failed:", error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setProfileImage(downloadURL); 
                }
            );
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleUpdateProfile = () => {
        profileUpdate({ username: formData.name, email: formData.email, image: profileImage });
        userProfile();
        dispatch(updateProfileAsync({ username: formData.name, email: formData.email, image: profileImage }));
    };

    return (
        <div className="w-full h-auto flex justify-center items-center">
            <div className="w-11/12 h-auto pt-10 flex flex-col gap-4 pb-11 2xl:b-5">
                <div className="bg-white w-full min-h-[80vh] rounded-lg flex flex-col px-5 py-8 gap-4">
                    <div className='w-auto px-12'>
                        <img src={yoked} alt='yoked' className='w-36 h-10' />
                        <div className='py-8 w-auto ps-1.5'>
                            <h1 className='font-bold text-2xl my-3'>Profile</h1>
                            <p className='text-sm font-normal text-[#808D9E] my-4'>Welcome! Update your details here!</p>
                            <div className="relative mt-6">
                                <div className="border border-[#E4774F] rounded-full p-1 w-28 h-28 relative">
                                    <img
                                        src={profileImage}
                                        alt="avatar"
                                        className="h-full w-full rounded-full cursor-pointer"
                                        onClick={handleImageClick}
                                    />
                                    <div
                                        className="absolute bg-[#E4774F] w-10 h-10 rounded-full right-0.5 bottom-0.5 flex justify-center items-center cursor-pointer"
                                        onClick={handleImageClick}
                                    >
                                        <BsPencil size={17} color="white" className="mb-0.5" />
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-row gap-4 ps-1 items-center mt-4 mb-7'>
                                <p className="font-normal text-lg text-black">Profile Picture</p>
                            </div>
                            <div className='flex flex-row gap-7 ps-1 items-center mb-5'>
                                <p className="font-normal text-lg text-black">Name</p>
                                <input 
                                    placeholder="Enter your name" 
                                    name="name"
                                    value={formData.name} 
                                    onChange={handleInputChange} 
                                    className="ps-4 py-2.5 pe-8 border border-[#E2E8F0] rounded-xl" 
                                />
                            </div>
                            <div className='flex flex-row gap-7 ps-1 items-center mb-5'>
                                <p className="font-normal text-lg text-black">Email</p>
                                <input 
                                    placeholder="Enter your email" 
                                    name="email"
                                    value={formData.email} 
                                    onChange={handleInputChange} 
                                    className="ps-4 py-2.5 pe-8 border border-[#E2E8F0] rounded-xl" 
                                />
                            </div>
                            <div className="mt-20">
                                <button 
                                    className="bg-[#2E4D55] px-12 py-4 text-white rounded-full text-base font-semibold" 
                                    onClick={handleUpdateProfile}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
