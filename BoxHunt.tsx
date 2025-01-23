import React, { useEffect, useRef, useState } from 'react'
// import { clearInterval } from 'timers';

const BoxHunt = () => {
  const [frequency, setfrequency] = useState<any>();
  const [gameStatus, setGameStatus] = useState<any>(false);
  const [mouseClickTable, setClickTable] = useState<any>([]);
  const [timer, setTimer] = useState<any>(0);
  const [frequencyVisible, setFrequencyVisible] = useState(true);
  const [boxPosition, setBoxPosition] = useState<any>({ left: '50%', top: '50%' });
  const frequencyTimer = useRef<any>(null);
  const reactionTimer = useRef<any>(null);

  const randomBoxPosition = () => {
    // console.log('randomBoxPosition called');
    
    setBoxPosition({
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 80 + 10}%`
    })
  }

  useEffect(() => {
    if (gameStatus) {
      frequencyTimer.current = setInterval(() => randomBoxPosition(), frequency * 1000)
      reactionTimer.current = setInterval(() => setTimer((prev: any) => prev + 1), 1000)
    } else {
      clearInterval(frequencyTimer.current)
      clearInterval(reactionTimer.current)
      setTimer(0)
    }
    return () => {
      clearInterval(frequencyTimer.current)
      clearInterval(reactionTimer.current)
    }
  }, [gameStatus]);

  const reset = () => {
    setFrequencyVisible(true);
    setGameStatus(false);
    clearInterval(frequencyTimer.current)
    clearInterval(reactionTimer.current)
    setClickTable([])
    setBoxPosition({ left: '50%', top: '50%' })
  }

  const start = () => {
    setFrequencyVisible(false);
    setGameStatus(true);
  }

  const addReactionEntry = () => {
    setClickTable([...mouseClickTable, ({ reactionTime: timer })])
    setTimer(0);
    clearInterval(reactionTimer.current)
    reactionTimer.current = setInterval(() => setTimer((prev: any) => prev + 1), 1000)
  }


  return (
    <div>
      <div className='border flex justify-between w-1/2 p-2'>
        {frequencyVisible && <input 
        type={"number"}
        value={frequency}
        onChange={(e) => setfrequency(e.target.value)}
           />}
        <button className='border' onClick={start}>START</button>
        <button className='border' onClick={() => setGameStatus(false)}>PAUSE</button>
        <button className='border' onClick={reset}>RESET</button>
      </div>
      <div>
        <div className='border h-[50vh]'>
          {gameStatus && <div 
           onClick={addReactionEntry}
          className='bg-red-500 cursor-pointer'
          style={{
            position: 'relative',
            width: '50px',
            height: '50px',
            left: `${boxPosition.left}`,
            top: `${boxPosition.top}`
          }}
           />}
        </div>
      </div>
      <div>
          <table  className='table border-separate'>
            <thead>
              <th className='border'>Mouse Click Number</th>
            <th className='border'>Reaction Time</th>
            </thead>
            <tbody>
              {mouseClickTable.map((el: any, index: any) => <>
              <tr>
                <td className='border'>{index + 1}</td>
                <td className='border'>{el.reactionTime}</td>
              </tr>
              </>
              )}
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default BoxHunt