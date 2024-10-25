import React, { useState } from "react";
import { SettingButtons } from "../../components/buttons/PrimaryButton";
import Password from "./Password";
import PrivacyPolicy from "./privacyPolicy";

export const Setting = () => {
    const [activeButton, setActiveButton] = useState('Password');

    

    const handleButtonClick = (title) => {
        setActiveButton(title);
    };

    return (
        <div className="w-full h-auto flex justify-center items-center ">
            <div className="w-11/12 h-auto pt-9 flex flex-col gap-4 pb-10 2xl:b-5">
                <h1 className="text-lg font-semibold">Settings</h1>
                <div className="bg-white w-full min-h-[80vh] rounded-lg flex flex-col px-10 py-8 gap-10 ">
                    <div className="flex gap-3 flex-wrap">
                        <SettingButtons title="Password" active={activeButton === 'Password'} onClick={() => handleButtonClick('Password')} />
                        <SettingButtons title="Privacy Policy" active={activeButton === 'PrivacyPolicy'} onClick={() => handleButtonClick('PrivacyPolicy')} />
                    </div>
                    {activeButton === 'Password' ? (
                        <Password />
                    ) : activeButton === 'PrivacyPolicy' ? (
                        <PrivacyPolicy />
                    ) :
                        (
                            <h1>No Data Found</h1>
                        )}
                </div>
            </div>
        </div>
    );
};
