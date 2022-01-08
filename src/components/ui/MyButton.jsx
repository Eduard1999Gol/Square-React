import React from 'react';

const MyButton = function (props) {
    return(
        <button {...props} className='text-white p-1 bg-green-500 rounded-md hover:bg-green-700 transition duration-300 uppercase'>
            calculate
        </button>
    )

}

export default MyButton;