import { useState } from "react"
import Die from "./Die"

function App() {
  const [dice] = useState(allNewDice())
  function allNewDice(): number[] {
    const diceArray: number[] = Array(10).fill(true).map(() => Math.floor(Math.random() * 6) + 1)
    return diceArray
  }
  const diceList = dice.map((die, index) => <Die key={`#dice-${index}`} value={die} />)
  return (
    <main className="bg-primary flex items-center justify-center max-w-md m-auto py-4 px-3 mt-5 text-xs rounded-md ">
      <div className="bg-secondary m-5 gap-5 rounded-md p-5 grid grid-cols-5 grid-rows-2 items-center max-w-sm">
        {diceList}
      </div>
    </main>
  )
}

export default App
