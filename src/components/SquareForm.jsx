import React, {useState} from 'react';
import MyButton from "./ui/MyButton"
import MyInput from "./ui/MyInput"
import axios from "axios";


const SquareForm = function () {
    const [square, setSquare] = useState({width:'', height:''});
    const [oldSquare, setOldSquare] = useState({width: 0, height: 0});
    const [area, setArea] = useState(0);
    const [scope, setScope] = useState(0);

    

    function calculate(event) {
        event.preventDefault();
        setArea(square.width*square.height);
        setOldSquare({width:square.width, height:square.height})
        setScope(2*(square.width+square.height))
        setSquare({width:'', height:''});
    }

    const fetchData = async () => {
        const res = await axios.get('http://localhost:3000/api/square/', { params: { height: square.height, width: square.width } });
        console.log(res.data.args);
        return res.data.args;
    }

    return(
        <div className="flex flex-col gap-2 items-center">
            <p className='text-4xl'> Height: {oldSquare.height}, Width: {oldSquare.width}</p>
            <p className='text-4xl'>Area: {area}, Scope: {scope}</p>
            <form onSubmit={calculate} className="flex flex-row gap-2 p-4 items-center justify-center">
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
            <MyButton />
            <MyButton type="button" onClick={fetchData}/>
            </form>
        </div>
    )
}

export default SquareForm;