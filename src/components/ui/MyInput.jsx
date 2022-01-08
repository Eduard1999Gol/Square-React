import React from 'react';

const MyInput = React.forwardRef(function (props, ref) {
    return(
        <input ref={ref} className='p-1 rounded-md bg-gray-50 boder border-1' {...props}/>
    )
})
export default MyInput;