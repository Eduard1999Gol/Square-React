import React, {useState} from 'react';
import axios from "axios";


const SquareForm = function () {
    const [square, setSquare] = useState({width: 0, height: 0});
    const [area, setArea] = useState(0);
    const [scope, setScope] = useState(0);
    const [areaApi, setAreaApi] = useState(0);
    const [scopeApi, setScopeApi] = useState(0);

    function calculate(event: React.MouseEvent) {
        event.preventDefault();
        setArea(square.width*square.height);
        setScope(2*(square.width+square.height))
        setSquare({width: 0, height: 0});  //input wird resetet
    }

    const fetchData = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const res = await axios.get('http://localhost:3000/api/square/', { params: { height: square.height, width: square.width } });
        console.log(res.data);
        setAreaApi(res.data.area);
        setScopeApi(res.data.scope)
        setSquare({width: 0, height: 0});
    }

    return(
        <div className="w-1/4">
            <div className='border-2 border-green-500 m-2 p-1 rounded-xl'>
                <p className='text-4xl'>Hallo, from App</p>
                <p className='text-3xl'>Area: {area}, Scope: {scope}</p>
            </div>
            <form className="grid grid-flow-row p-4  rounded-xl shadow-xl">
            <input className=' p-2 bg-gray-100 rounded-md mb-2'
                type="number"
                placeholder="Height"
                name="height"
                min="0"
                value={square.height}
                required
                onChange={(e: { target: { value: string; }; }) => setSquare({...square, height: parseInt(e.target.value)})}
                />
            <input className=' p-2 bg-gray-100 rounded-md'
                type="number"
                placeholder="Width"
                name="width"
                min="0"
                value={square.width}
                required
                onChange={(e: { target: { value: string; }; }) => setSquare({...square, width: parseInt(e.target.value)})}
                />
            <div className='flex justify-center mt-1'>
            <button onClick={calculate} className='p-2 m-1 bg-green-600 text-base text-white rounded-xl hover:bg-green-800 uppercase'>MyApp</button>
            <button onClick={fetchData} className='p-2 m-1 bg-blue-600 text-base text-white rounded-xl hover:bg-blue-800 uppercase'>Server</button>
            </div>    
            </form>
            <div className='border-2 border-blue-500 m-2 p-1 rounded-xl'>
                <p className='text-4xl'>Hallo, from Server</p>
                <p className='text-3xl'>Area: {areaApi}, Scope: {scopeApi}</p>
            </div>

           
        </div>
    )
}

export default SquareForm;