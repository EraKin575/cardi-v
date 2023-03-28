import React,{useState} from 'react'
import {Button, Card, Form, Input, Select,Modal} from 'antd'
import {createClient} from '@supabase/supabase-js'
const supabaseUrl='https://syvwulfpusrdsnpzmucs.supabase.co'
const supabaseKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5dnd1bGZwdXNyZHNucHptdWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MTU2NzYsImV4cCI6MTk5NTQ5MTY3Nn0.otB0dqVhCA6-4TWnOL31nOLFROHCF7DZc-PohP0pScc'
const supabase = createClient(supabaseUrl, supabaseKey)
const CreateCard = () => {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        link: '',
        category: '',
    })
    let categories = []
    
    const showModal = () => {
        const { data, error } =supabase
        .from('cardv')
        .select('category')
        .then((res)=>{
            console.log(res)
            res.data.map((item)=>{
                categories.push(item.category)
            })
        })

        console.log(categories)
      
    



       

        setOpen(true)
    }
    const handleOk = () => {
        supabase.
        from('cardv').
        insert([
            {name: formData.name,
             link: formData.link,
             category: formData.category
            },
        ])
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })

        setOpen(false)
        window.location.reload()
    }
    const handleCancel = () => {
        setOpen(false)
    }
    const [loading, setLoading] = useState(false)



  return (
    <div>
         <Button type="primary"
         style={{
            color: 'black',
            borderColor: 'black',
         }}
          onClick={showModal}>
        +New
      </Button>
      <Modal 
        title="Create Card" 
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
            <Button key="back" onClick={handleCancel}>
                Return
            </Button>,
            <Button
            style={{
                color: 'black',
                borderColor: 'black',
            }}
             key="submit" type="primary" loading={loading} onClick={handleOk}>
                Submit
            </Button>,
        ]}
        >
        <label>
            Name:
        </label>
        <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label>
            Link:
        </label>
        <Input

            type="text"
            name="link"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
        />
        <label>
            Category:
        </label>
        <div className='flex'>
        <Select
            name="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}    
        >
            {categories.map((category) => (
                <Select.Option value={category}>{category}</Select.Option>
            ))}


        
        </Select>
        or
        <Input
        style={{
            width: '200px',
        }}
            type="text"
            name="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
        </div>
        </Modal>

    


    </div>
  )
}

export default CreateCard