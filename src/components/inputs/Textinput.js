import React from 'react';

const Textinput = ({placeholder , onchange ,stateValue ,widht}) => {
    return (
        <input className='px-4 w-full h-16 border border-[#E2E8F0] rounded-md bg-transparent outline-none' placeholder={placeholder} onChange={(e) => { onchange(e.target.value) }} value={stateValue}/>
       );
}

export default Textinput;
