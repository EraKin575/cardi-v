import CreateCard from '../components/CreateCard'
import React from 'react'
import { createClient } from '@supabase/supabase-js'
import CardComponent from '@/components/CardComponent'

const supabaseUrl='https://syvwulfpusrdsnpzmucs.supabase.co'
const supabaseKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5dnd1bGZwdXNyZHNucHptdWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MTU2NzYsImV4cCI6MTk5NTQ5MTY3Nn0.otB0dqVhCA6-4TWnOL31nOLFROHCF7DZc-PohP0pScc'

const supabase = createClient(supabaseUrl, supabaseKey)

const HomePage = () => {
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('cardv')
        .select('*')
      setData(data)
    }
    fetchData()
    
  }, [])

  let cardData

  if(data){
    cardData = data.map((card) => {
      return (
        <CardComponent
        name={card.name}
        link={card.link}
        category={card.category}
        />
       
      )
    })
    
  }


  
  return (
    <div
    className='px-5'
    >
        <h1
        className='text-center text-3xl'
        >CardV
        </h1>
        <hr 
        className='border-2 border-gray-300'
        />
        <CreateCard/>

        <div
        className='grid grid-cols-3'
        >
            {cardData}

        </div>

    </div>

  )
}

export default HomePage