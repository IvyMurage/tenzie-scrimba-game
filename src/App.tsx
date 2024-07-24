import { useEffect, useState } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"

type DiceProps = {
  id: string
  value: number,
  isHeld: boolean
}

function App() {
  const [dice, setDice] = useState<DiceProps[]>(allNewDice())
  const [tenzies, setTenzie] = useState(false)


  useEffect(() => {
    dice.every(die => die.isHeld === true) && new Set(dice.map(die => die.value)).size && setTenzie(true)
  }, [dice])
  console.log(tenzies)
  function generateNewDice() {
    return ({
      id: nanoid(),
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false
    })
  }
  function allNewDice(): DiceProps[] {
    const diceArray: DiceProps[] = Array(10).fill(true).map(() => (
      generateNewDice()))
    return diceArray
  }

  function handleRollDice(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.isHeld ? die : generateNewDice()
      })
    })
  }

  function holdDice(diceId: string) {
    console.log(diceId)
    setDice(oldDice => oldDice.map(die => die.id === diceId ? ({ ...die, isHeld: !die.isHeld }) : die))
  }
  const diceList = dice.map((die) => <Die
    holdDice={() => holdDice(die.id)}
    key={die.id} styles={{ backgroundColor: die.isHeld ? '#59E391' : '#F5F5F5' }}
    value={die.value} />)


  return (
    <main className="bg-primary flex items-center justify-center max-w-md m-auto py-4 px-3 mt-5 text-xs rounded-md ">
      <div className="bg-secondary m-5 gap-5 rounded-md p-5 grid grid-cols-5 grid-rows-2 items-center max-w-sm">
        <div className=" col-span-full place-self-center text-center">
          <h1 className="font-bold text-lg">Tenzies</h1>
          <p className="text-base mt-4">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>

        {diceList}
        <button onClick={handleRollDice} className=" border-0 font-inter bg-primary rounded-md font-semibold w-fit place-self-center text-secondary px-5 py-2 col-span-full">
          Roll
        </button>
      </div>
    </main>
  )
}

export default App
