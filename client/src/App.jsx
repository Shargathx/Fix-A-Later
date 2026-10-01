import { useEffect } from 'react'
import { supabase } from './supabaseClient'

function App() {
  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase.from('todos').select('*')
      
      if (error) {
        console.log('Supabase response/error:', error.message)
      } else {
        console.log('Successfully connected to Supabase!', data)
      }
    }

    testConnection()
  }, [])

  return (
    <div>
      <h1>Fix-A-Later</h1>
    </div>
  )
}

export default App