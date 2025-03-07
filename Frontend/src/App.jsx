import { useEffect, useState } from 'react'
import './App.css'
import Editor from 'react-simple-code-editor'
import 'prismjs/themes/prism-tomorrow.css'
import prism from 'prismjs'
import Markdown from 'react-markdown'
import axios from 'axios'

function App() {
  const [code, setCode] = useState(`
function sum(){
return a+b;
}`);

  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll()
  }, [])

  // async function reviewCode() {
  //   const response = await axios.post('http://localhost:3000/ai/get-review' , { code })

  //   setReview(response.data)
  // }

  async function reviewCode() {
    try {
      setLoading(true);

      if (!code.trim()) {
        setReview("⚠️ Please enter some code before submitting.");  // Show warning if empty
        return;
      }
  
      const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
      const response = await axios.post(`${API_URL}/ai/get-review`, { code });

      setReview(response.data);
    } 
    catch (error) {
      if (error.response) {
        // Server responded with a status code other than 2xx
        setReview(`⚠️ Error: ${error.response.data}`);
      } else if (error.request) {
        // Request was made but no response received
        setReview("⚠️ No response from the server. Please check your backend.");
      } else {
        // Other errors
        setReview("⚠️ Something went wrong. Please try again.");
      }
    }
    finally {
      setLoading(false); // Hide loading state
    }
  }
  

  return (
    <>
      <main>
        <div className='left'>
          <div className='code'>
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: '1px solid #ddd',
                borderRadius: '5px',
                height: '100%',
                width: '100%',
              }}
            />
          </div>
          <div onClick={reviewCode} className='review'>
            {loading ? "Reviewing..." : "Review"}
          </div>
        </div>
        <div className='right'>
          <Markdown>
            {review}
          </Markdown>
        </div>
      </main>
    </>
  )
}



export default App
