import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { getAllLinks } from './store/reducers/linksSlice'

function App() {
  const [count, setCount] = useState(0)
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLinks({
      username: "Sairam"
    }))
  })

  return (
    <>
      <h1 className='text-red-400'>Started</h1>
    </>
  )
}

export default App
