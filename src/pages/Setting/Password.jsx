import React, { useState, useEffect } from 'react';
import useSetting from "./useHook";
import IconInput from '../../components/inputs/IconInput';
import Swal from 'sweetalert2';

export default function Password() {
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const { changePassword } = useSetting();
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const update = () => {
        if (passwordsMatch) {
            changePassword(passwords);
            setPasswords({ oldPassword: passwords.newPassword, newPassword: '', confirmPassword: '' });
        }
        else{
            Swal.fire({
                title: "Oops!",
                text: "Your New Password And Confirm Password Is Not Same",
                icon: "error"
            });
        }
    };

    const handleChange = (field, value) => {
        const updatedPasswords = {
            ...passwords,
            [field]: value
        };
        setPasswords(updatedPasswords);

        if (field === 'newPassword' || field === 'confirmPassword') {
            setPasswordsMatch(updatedPasswords.newPassword === updatedPasswords.confirmPassword);
        }
    };

    const allFieldsFilled = passwords.oldPassword && passwords.newPassword && passwords.confirmPassword;

    return (
        <div>
            <h1 className="text-lg">Change Password</h1>
            <div className="w-[30rem] flex pt-8 flex-col gap-14">
                <div className="flex flex-col gap-4">
                    <label htmlFor="current-password" className="text-sm font-semibold">Current Password:</label>
                    <div className="flex">
                        <IconInput
                            placeholder={'current password'}
                            onchange={(value) => handleChange('oldPassword', value)}
                            stateValue={passwords.oldPassword}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-10">
                    <h2 className="inter text-sm font-medium text-[#9CA4AB]">Create New Password</h2>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <label className="text-sm font-semibold" htmlFor="new-password">New Password</label>
                            <div className="flex">
                                <IconInput
                                    placeholder={'New Password'}
                                    onchange={(value) => handleChange('newPassword', value)}
                                    stateValue={passwords.newPassword}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="text-sm font-semibold" htmlFor="confirm-password">Confirm Password</label>
                            <div className="flex">
                                <IconInput
                                    placeholder={'Confirm Password'}
                                    onchange={(value) => handleChange('confirmPassword', value)}
                                    stateValue={passwords.confirmPassword}
                                />
                            </div>
                            {!passwordsMatch && <p className="text-red-600">New password and confirm password do not match</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full pt-14">
                <button disabled={!allFieldsFilled} className={`bg-[#156A3D] text-white px-12 py-3 rounded-3xl inter font-bold text-sm ${!allFieldsFilled && 'opacity-50 cursor-not-allowed'}`} onClick={update}>Update</button>
            </div>
        </div>
    );
}
