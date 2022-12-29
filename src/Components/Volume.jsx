import { useState } from "react";

function VolumeSlider({audioElem}) {

    const [value, setValue] = useState(0.5)

    function getBackgroundSize(){
        return { backgroundSize: `${value * 100 / 1}% 100%`}
    }
    
    return (  
        <input 
            type='range'
            min='0'
            max='1'
            step="0.01"
            className="appearance-none bg-gray rounded-lg bg bg-gradient-to-r from-yellow to-yellow h-1 cursor-pointer slider-thumb bg-no-repeat w-full"
            value={value}
            onChange={(e)=>{
                setValue(e.target.valueAsNumber)
                audioElem.current.volume = e.target.value
            }}
            style={getBackgroundSize()}
        />
    );
}

export default VolumeSlider;