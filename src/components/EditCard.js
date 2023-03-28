import React,{useState} from 'react'
import {Button, Card, Form, Input, Select,Modal} from 'antd'
import {createClient} from '@supabase/supabase-js'

const supabaseUrl='https://syvwulfpusrdsnpzmucs.supabase.co'
const supabaseKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5dnd1bGZwdXNyZHNucHptdWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MTU2NzYsImV4cCI6MTk5NTQ5MTY3Nn0.otB0dqVhCA6-4TWnOL31nOLFROHCF7DZc-PohP0pScc'
const supabase = createClient(supabaseUrl, supabaseKey)

const EditCard = ({name,link,category}) => {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        name:'',
        link:'',
        category:'',
    })
    const showModal = () => {
        setOpen(true)
    }
    const handleOk = () => {
        //edit card by name
        supabase.
        from('cardv').
        update({name:(formData.name?formData.name:name),link:(formData.link?formData.link:link),category:formData.category}).
        match({name:name})
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })


       
        setOpen(false)
        window.location.reload()
    }
    const handleCancel=()=>{
        setOpen(false)
    }
  return (
    <div>
        <Button type="primary"
         style={{
            color: 'black',
            backgroundColor: 'green',
         }}
          onClick={showModal}>
        Edit
      </Button>
        <Modal  
        title={`Edit ${name}`}    
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        >
            <div>
                <label>
                    Name:
                </label>
                <Input
                onChange={(e) =>{setFormData({ ...formData, name: e.target.value })}}
                value={formData.name}
                />

                <label>
                    Link:
                </label>
                <Input
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                value={formData.link}
                />

                <label>
                    Category:
                </label>
                
                

            </div>

        
        
        </Modal>
        


    </div>
  )
}

export default EditCard