import React,{useState,useEffect} from 'react'
import {createClient} from '@supabase/supabase-js'
import EditCard from './EditCard'
import { Modal } from 'antd'



const supabaseUrl='https://syvwulfpusrdsnpzmucs.supabase.co'
const supabaseKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5dnd1bGZwdXNyZHNucHptdWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MTU2NzYsImV4cCI6MTk5NTQ5MTY3Nn0.otB0dqVhCA6-4TWnOL31nOLFROHCF7DZc-PohP0pScc'
const supabase = createClient(supabaseUrl, supabaseKey)

const CardComponent = ({name,link,category}) => {
  const [videoid, setVideoid] = useState('')

  useEffect(() => {
    const extractVideoID = (url) => {
      let video_id = url.split('v=')[1];
      let ampersandPosition = video_id.indexOf('&');
      if(ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
      }
      setVideoid(video_id)
    }
    extractVideoID(link)
  }, [link])

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

  const [open, setOpen] = useState(false)

return (
  <div>
  <div
  onClick={() => setOpen(true)}
   className='border-2 p-6 w-[400px] '>
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
  <Modal
  title={`Edit ${name}`}
  open={open}
  onOk={() => setOpen(false)}
  onCancel={() => setOpen(false)}
  >
      <div>
        <iframe
        src={`https://www.youtube.com/embed/${videoid}`}
        width='400'
        height='300'
        />
  </div>
  </Modal>
  </div>
)
}

export default CardComponent
