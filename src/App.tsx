import Die from "./Die"

function App() {
  return (
    <main className="bg-primary flex items-center justify-center max-w-md m-auto py-4 px-3 mt-5 text-xs rounded-md ">
      <div className="bg-secondary m-5 gap-5 rounded-md p-5 grid grid-cols-5 grid-rows-2 items-center max-w-sm">
        <Die value={1} />
        <Die value={2} />
        <Die value={3} />
        <Die value={4} />
        <Die value={5} />
        <Die value={6} />
      </div>
    </main>
  )
}

export default App
