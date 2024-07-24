import { useEffect, useRef, useState } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import ReactConfetti from "react-confetti"
import Timer from "./timer"

type DiceProps = {
  id: string
  value: number,
  isHeld: boolean
}

export type TimeProp = {
  miniSeconds: number,
  maxSeconds: number,
  maxMinutes: number,
  minMinutes: number
}

function App() {
  const [dice, setDice] = useState<DiceProps[]>(allNewDice())
  const [tenzies, setTenzie] = useState(false)
  const [seconds, setSeconds] = useState<TimeProp>({
    maxMinutes: 0,
    minMinutes: 0,
    miniSeconds: 0,
    maxSeconds: 0
  })
  const ref = useRef<number>(0)

  useEffect(() => {
    dice.every(die => die.isHeld === true) && new Set(dice.map(die => die.value)).size === 1 && setTenzie(true)
  }, [dice])

  function generateNewDice() {
    return ({
      id: nanoid(),
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false
    })
  }

  useEffect(() => {
    if (!tenzies) {
      ref.current = setInterval(() => setSeconds((prevSecond) => {
        if (prevSecond.miniSeconds < 9) {
          return {
            ...prevSecond,
            miniSeconds: prevSecond.miniSeconds + 1
          }
        }
        if (prevSecond.maxSeconds === 5 && prevSecond.miniSeconds === 9) {
          return {
            ...prevSecond,
            miniSeconds: 0,
            maxSeconds: 0,
            minMinutes: prevSecond.minMinutes ? prevSecond.minMinutes + 1 : 1
          }
        }
        else if (prevSecond.minMinutes === 9) {
          return {
            ...prevSecond,
            miniSeconds: 0,
            maxSeconds: 0,
            minMinutes: 0,
            maxMinutes: prevSecond.maxMinutes ? prevSecond.maxMinutes + 1 : 1
          }
        }
        else {
          return ({
            ...prevSecond,
            miniSeconds: 0,
            maxSeconds: prevSecond.maxSeconds ? prevSecond.maxSeconds + 1 : 1
          })
        }
      }), 1000)
    }
    return () => clearInterval(ref.current)
  }, [tenzies])


  useEffect(() => {
    if (tenzies) {
      clearInterval(ref.current)
    }
  }, [tenzies])
  function allNewDice(): DiceProps[] {
    const diceArray: DiceProps[] = Array(10).fill(true).map(() => (
      generateNewDice()))
    return diceArray
  }

  function handleRollDice(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (tenzies) {
      setTenzie(false)
      setDice(allNewDice())
      setSeconds({
        miniSeconds: 0,
        maxMinutes: 0,
        maxSeconds: 0,
        minMinutes: 0
      })
    }
    else {
      setDice(prevDice => {
        return prevDice.map(die => {
          return die.isHeld ? die : generateNewDice()
        })
      })
    }
  }

  function holdDice(diceId: string) {
    setDice(oldDice => oldDice.map(die => die.id === diceId ? ({ ...die, isHeld: !die.isHeld }) : die))
  }
  const diceList = dice.map((die) => <Die
    holdDice={() => holdDice(die.id)}
    key={die.id} styles={{ backgroundColor: die.isHeld ? '#59E391' : '#F5F5F5' }}
    value={die.value} />)


  return (
    <>
      <Timer seconds={seconds} />
      <main className=" clear-both bg-primary flex items-center justify-center max-w-md m-auto py-4 px-3 mt-5 text-xs rounded-md ">
        {tenzies && <ReactConfetti
        />}
        <div className="bg-secondary m-5 gap-5 rounded-md p-5 grid grid-cols-5 grid-rows-2 items-center max-w-sm">
          <div className=" col-span-full place-self-center text-center">
            <h1 className="font-bold text-lg">Tenzies</h1>
            <p className="text-base mt-4">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          </div>

          {diceList}
          <button onClick={handleRollDice} className=" border-0 font-inter bg-primary rounded-md font-semibold w-fit place-self-center text-secondary px-5 py-2 col-span-full">
            {tenzies ? 'New Game' : 'Roll'}
          </button>
        </div>
      </main>
    </>
  )
}

export default App
