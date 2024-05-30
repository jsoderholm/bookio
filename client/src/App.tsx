import { useState } from "react"
import { Button } from "./components/ui/button"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex container">
      <div className="mx-auto">
        <h1 className="text-3xl m-au">Bookio</h1>
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </div>
    </div>
  )
}

export default App
