import React from 'react'
import {createClient} from '@supabase/supabase-js'
import EditCard from './EditCard'



const supabaseUrl='https://syvwulfpusrdsnpzmucs.supabase.co'
const supabaseKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5dnd1bGZwdXNyZHNucHptdWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MTU2NzYsImV4cCI6MTk5NTQ5MTY3Nn0.otB0dqVhCA6-4TWnOL31nOLFROHCF7DZc-PohP0pScc'
const supabase = createClient(supabaseUrl, supabaseKey)
const CardComponent = ({name,link,category}) => {
    
    const onDelete = () => {
        supabase
        .from('cardv')
        .delete()
        .match({name: name})
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
        window.location.reload()
       

        
    }



    

  return (
    <div className='border-2 p-6 w-[400px] '>
        <div className='flex w-[150px] text-base '>
            <h1
            className='text-xl'
            >{name}</h1>
            <div className='flex flex-end pl-6 gap-3'>
            <button
            onClick={onDelete}
             className='text-white h-[25px] rounded-md w-[70px] bg-red-500'>Delete</button>
            <EditCard
            name={name}
            link={link}
            category={category}
            />
            </div>
        </div>
        <hr className='border-2 border-gray-300'/>
        <div className=''>
            <a href={link}>Click Here to Play</a>
            
            <h1
            className='bg-gray-300 w-min p-1 rounded-md'
            >{category}</h1>
        </div>
    </div>
  )
}

export default CardComponent