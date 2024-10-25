import React from 'react';
import { colors } from '../../helpers/constants';

const PrimaryButton = ({onclick , fill , fillColor , width , round, outlined, outlineColor, title}) => {
    return (
        // <button className={`h-14 ${fill ? 'bg-[' + fillColor + ']' : outlined ? 'border-[' + outlineColor + ']' : ''} w-[${width}] rounded-${round}`} onClick={onclick}>
        <button className={`h-16 bg-[#2E4D55] w-[100%] rounded-full text-white`} onClick={onclick}>
            {title }
        </button>
    );
}
export const MessageButton = ({onclick ,width ,height, title}) => {
  const buttonStyle = {
        width: width,
        height:height
    };

    return (
        <button className={` bg-[${colors.orange}] rounded-[35px] text-white`} style={buttonStyle} onClick={onclick}>
            {title}
        </button>
    );
}

export const UserActionButtons = ({ title, active, onClick }) => {
    return (
      <button
        className={`py-3 px-10 rounded-lg text-lg ${
          active ? 'bg-[#84C1C2] text-white font-semibold' : 'bg-[#EAECF0] text-[#ADB5BD] font-normal'
        }`}
        onClick={onClick}
      >
        {title}
      </button>
    );
  };
export const SettingButtons = ({ title, active, onClick }) => {
    return (
      <button
        className={`py-2 px-8 rounded-lg text-lg ${
          active ? 'bg-[#84C1C2] text-white font-normal' : 'bg-gray-100 text-[#ADB5BD] font-medium'
        }`}
        onClick={onClick}
      >
        {title}
      </button>
    );
  };
  

export default PrimaryButton;