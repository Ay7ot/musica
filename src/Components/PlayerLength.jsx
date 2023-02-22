import { useEffect, useState, useRef  } from "react";

function PlayerLength({ currentSong, audioElem }) {

    const clickRef = useRef()
    const [playerValue, setPlayerValue] = useState(0)

    useEffect(()=>{
        if(currentSong.progress){
            setPlayerValue(currentSong.progress)
        }
    },[currentSong.progress])
    
    function getBackgroundSize(){
        return { backgroundSize: `${playerValue * 100 / 100}% 100%`}
    }

    function changePosition(e){
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;

        const newProgress = offset / width * 100;
        audioElem.current.currentTime = newProgress / 100 * currentSong.length
    }

    return (  
        <input 
            ref={clickRef}
            type='range'
            min='0'
            max='100'
            step='0.5'
            value={playerValue}
            onChange={(e)=>setPlayerValue(e.target.valueAsNumber)}
            style={getBackgroundSize()}
            onClick={changePosition}
            className="appearance-none bg-gray rounded-lg bg bg-gradient-to-r w-full md:w-[500px] xl:w-[600px] from-yellow to-yellow h-1 cursor-pointer slide-thumb-player bg-no-repeat"
        />
    );
}

export default PlayerLength;