import React, { useEffect, useState } from 'react'
import Title from '../../components/Owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ManageApplications = () => {
  const { axios, user } = useAppContext()
  const [applications, setApplications] = useState([])

  const fetchApplications = async () => {
    const { data } = await axios.get('/api/owner/applications')
    if (data.success) setApplications(data.applications)
  }

  const handleReview = async (applicationId, status, adminNote = "") => {
    const { data } = await axios.post('/api/owner/review-application', {
      applicationId, status, adminNote
    })
    if (data.success) {
      toast.success(data.message)
      fetchApplications()
    }
  }

  useEffect(() => { 
  if(user) fetchApplications() 
}, [user])

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title 
        title="Owner Applications" 
        subTitle="Review and approve car listing applications"
      />
      <div className='mt-6 flex flex-col gap-4 max-w-3xl'>
        {applications.length === 0 && (
          <p className='text-gray-400 text-center mt-10'>No applications yet</p>
        )}
        {applications.map((app, index) => (
          <div key={index} className='border border-borderColor rounded-lg p-5'>
            <div className='flex items-center gap-3 mb-3'>
              <img 
                src={app.user.image || '/default-avatar.png'} 
                className='w-10 h-10 rounded-full object-cover'
              />
              <div>
                <p className='font-medium'>{app.user.name}</p>
                <p className='text-sm text-gray-500'>{app.user.email}</p>
              </div>
              <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium
                ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 
                  app.status === 'approved' ? 'bg-green-100 text-green-600' : 
                  'bg-red-100 text-red-600'}`}>
                {app.status}
              </span>
            </div>

            <div className='grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3'>
              <p><span className='font-medium'>Phone:</span> {app.phone}</p>
              <p><span className='font-medium'>CNIC:</span> {app.cnicNumber}</p>
              <p className='col-span-2'>
                <span className='font-medium'>Address:</span> {app.address}
              </p>
              <p className='col-span-2'>
                <span className='font-medium'>Reason:</span> {app.reason}
              </p>
            </div>

            {app.status === 'pending' && (
              <div className='flex gap-2 mt-3'>
                <button
                  onClick={() => handleReview(app._id, 'approved')}
                  className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white 
                  rounded-lg text-sm cursor-pointer transition-all'
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    const note = prompt("Rejection reason (optional):")
                    handleReview(app._id, 'rejected', note || "")
                  }}
                  className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white 
                  rounded-lg text-sm cursor-pointer transition-all'
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageApplications