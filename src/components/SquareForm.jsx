import React, {useState} from 'react';
import MyButton from "./ui/MyButton"
import MyInput from "./ui/MyInput"
import axios from "axios";


const SquareForm = function () {
    const [square, setSquare] = useState({width:'', height:''});
    const [oldSquare, setOldSquare] = useState({width: 0, height: 0});
    const [area, setArea] = useState(0);
    const [scope, setScope] = useState(0);
    const [oldSquareApi, setOldSquareApi] = useState({width: 0, height: 0});
    const [areaApi, setAreaApi] = useState(0);
    const [scopeApi, setScopeApi] = useState(0);

    

    function calculate(event) {
        event.preventDefault();
        setArea(square.width*square.height);
        setOldSquare({width:square.width, height:square.height})
        setScope(2*(square.width+square.height))
        setSquare({width:'', height:''});
    }

    const fetchData = async (event) => {
        event.preventDefault();
        const res = await axios.get('http://localhost:3000/api/square/', { params: { height: square.height, width: square.width } });
        console.log(res.data);
        setAreaApi(res.data.area);
        setScopeApi(res.data.scope)
        setOldSquareApi({width:res.data.width, height:res.data.height});
    }

    return(
        <div className="flex flex-col gap-2 items-center">
            <p className='text-4xl'> Height: {oldSquare.height}, Width: {oldSquare.width}</p>
            <p className='text-4xl'>Area: {area}, Scope: {scope}</p>
            <form className="flex flex-row gap-2 p-4 items-center justify-center">
            <MyInput
            type="number"
            placeholder="Height"
            name="height"
            min="0"
            value={square.height}
            required
            onChange={(e) => setSquare({...square, height: parseInt(e.target.value)})}
            />
            <MyInput
            type="number"
            placeholder="Width"
            name="width"
            min="0"
            value={square.width}
            required
            onChange={(e) => setSquare({...square, width: parseInt(e.target.value)})}
            />
            <MyButton onClick={calculate} />
            <MyButton onClick={fetchData} />
            </form>
            <p className='text-4xl'> Height: {oldSquareApi.height}, Width: {oldSquareApi.width}</p>
            <p className='text-4xl'>Area: {areaApi}, Scope: {scopeApi}</p>
        </div>
    )
}

export default SquareForm;