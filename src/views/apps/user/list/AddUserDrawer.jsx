// React Imports
import { useState } from 'react'

// MUI Imports
import { redirect } from 'next/navigation'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

export const dynamic = 'force-dynamic'

// Vars
const initialData = {
  fullName: '',
  username: '',
  email: '',
  company: '',
  country: '',
  contact: '',
  role: '',
  plan: '',
  status: ''
}

const AddUserDrawer = ({ open, handleClose }) => {
  // States
  const [formData, setFormData] = useState(initialData)

  const handleReset = () => {
    handleClose()
    setFormData({
      fullName: '',
      username: '',
      email: '',
      company: '',
      country: '',
      contact: '',
      role: '',
      plan: '',
      status: ''
    })
  }

  async function action() {
    const prepareData = {
      fullName: formData.fullName,
      company: formData.company,
      username: formData.username,
      country: formData.country,
      contact: formData.contact,
      email: formData.email,
      status: formData.status
    }

    console.log('[action call - prepareData]', prepareData)

    const res = await fetch(`http://localhost:3000/api/apps/user-save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prepareData)
    })

    const data = await res.json()

    setFormData(initialData)
    redirect('/apps/user/list')
  }

  return (
    <div>
      <div className='flex items-center justify-between pli-5 plb-[15px]'>
        <Typography variant='h5'>Add New User</Typography>
        <IconButton onClick={handleReset}>
          <i className='ri-close-line' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-5'>
        <form action={action} className='flex flex-col gap-5'>
          <TextField
            label='Full Name'
            fullWidth
            placeholder='John Doe'
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
          />
          <TextField
            label='Username'
            fullWidth
            placeholder='johndoe'
            value={formData.username}
            onChange={e => setFormData({ ...formData, username: e.target.value })}
          />
          <TextField
            label='Email'
            fullWidth
            placeholder='johndoe@gmail.com'
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            label='Company'
            fullWidth
            placeholder='Company PVT LTD'
            value={formData.company}
            onChange={e => setFormData({ ...formData, company: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel id='country'>Select Country</InputLabel>
            <Select
              fullWidth
              id='country'
              value={formData.country}
              onChange={e => setFormData({ ...formData, country: e.target.value })}
              label='Select Country'
              labelId='country'
              inputProps={{ placeholder: 'Country' }}
            >
              <MenuItem value='UK'>UK</MenuItem>
              <MenuItem value='USA'>USA</MenuItem>
              <MenuItem value='Australia'>Australia</MenuItem>
              <MenuItem value='Germany'>Germany</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label='Contact'
            type='number'
            fullWidth
            placeholder='(397) 294-5153'
            value={formData.contact}
            onChange={e => setFormData({ ...formData, contact: e.target.value })}
          />

          <FormControl fullWidth>
            <InputLabel id='plan-select'>Select Status</InputLabel>
            <Select
              fullWidth
              id='select-status'
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
              label='Select Status'
              labelId='status-select'
              inputProps={{ placeholder: 'Select Status' }}
            >
              <MenuItem value='pending'>Pending</MenuItem>
              <MenuItem value='active'>Active</MenuItem>
              <MenuItem value='inactive'>Inactive</MenuItem>
            </Select>
          </FormControl>
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='outlined' color='error' type='reset' onClick={() => handleReset()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUserDrawer
