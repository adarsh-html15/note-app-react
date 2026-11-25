import { useEffect, useState } from 'react'
import './App.css'
import notesBackground from '../assets/notes2.png'

function App() {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')

  const [task, setTask] = useState(() => {
    const savedNotes = localStorage.getItem('notes')
    return savedNotes ? JSON.parse(savedNotes) : []
  })

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(task))
  }, [task])

  const submitHandler = (e) => {
    e.preventDefault()

    setTask((currentTask) => [...currentTask, { title, details }])

    setTitle('')
    setDetails('')
  }

  const deleteNote = (idx) => {
    const copyTask = [...task]
    copyTask.splice(idx, 1)
    setTask(copyTask)
  }
  return (
    <main className="min-h-screen bg-[#11100e] px-5 py-10 text-[#f4eee2] sm:px-8">
      <form
        onSubmit={(e) => {
          submitHandler(e)
        }}
        className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 rounded-2xl border border-[#493b22] bg-[#1b1915] p-6 shadow-lg shadow-black/30 md:grid-cols-2 md:gap-10 md:p-10">
        <div className="flex flex-1 flex-col gap-5">
          <h1 className='text-xl bolder '>Add Notes</h1>
          {/* first input for heading */}
          <input
            type="text"
            placeholder="Enter Notes Here"
            className="h-30 w-full rounded-xl border border-[#51442c] bg-[#24211b] px-5 placeholder:text-[#9e927d] "
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)

            }}

          />
          {/* detailed input */}
          <textarea
            placeholder="Write Details Here"
            className="h-40 w-full resize-none rounded-xl border border-[#51442c] bg-[#24211b] px-5 py-4 placeholder:text-[#9e927d] "
            value={details}
            onChange={(e) => {
              setDetails(e.target.value)

            }}


          />
          <button
            type="submit"
            className="self-start rounded-lg bg-[#c7a45a] px-6 py-3 font-medium text-[#17140e] transition hover:bg-red-500">Add Notes</button>
        </div>
        <div className='min-w-0 p-4 md:p-0'>
          <h1 className='text-xl p-10 font-bold'>Recent Notes</h1>
          <div className='flex h-[60vh] min-h-0 flex-wrap content-start gap-5 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>

            {task.map((elem, idx) => {
              return (

                <div
                  key={idx}
                  className='h-52 w-39 flex justify-between flex-col relative rounded-xl bg-cover bg-center p-4 leading-tight'
                  style={{ backgroundImage: `url(${notesBackground})` }}>
                  <h3 className='leading-tight p-1.5 text-xl font-bold !text-black'>{elem.title}</h3>
                  <p className='min-h-0 flex-1 overflow-y-auto leading-tight p-1 font-medium !text-gray-800 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>{elem.details}</p>
                  <button type="button" onClick={() => deleteNote(idx)} className='rounded bg-red-600 ml-5 font-bold'>delete</button>
                </div>
              )
            })}

          </div>
        </div>
      </form>
    </main>
  )
}

export default App