import { useState, useEffect } from 'react'

function App(): React.JSX.Element {
  const [clipboardText, setClipboardText] = useState('')

  useEffect(() => {
    window.electron.ipcRenderer.on('clipboard-text', (_, text) => {
      setClipboardText(text)
    })
  }, [])

  return (
    <div className="container">
      <h1>TokZeth</h1>
      <p>Copied Text:</p>
      <div className="clipboard-content">{clipboardText}</div>
    </div>
  )
}

export default App
