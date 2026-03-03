import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const ApplyOwner = () => {
  const { axios, user, navigate, logout } = useAppContext() // ✅ logout add kiya

  const [status, setStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    phone: "", cnicNumber: "", address: "", reason: ""
  })

  useEffect(() => {
    if (!user) { navigate('/'); return }

     // Admin ya Owner hai to seedha dashboard pe bhejo
  if (user.role === 'admin' || user.role === 'owner') {
    navigate('/owner')
    return
  }
    const checkStatus = async () => {
      const { data } = await axios.get('/api/owner/application-status')
      if (data.application) setStatus(data.application)
    }
    checkStatus()
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { data } = await axios.post('/api/owner/apply', form)
      if (data.success) {
        toast.success(data.message)
        setStatus({ status: 'pending' })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Status screens
  if (status) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] px-4'>
        <div className='bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center'>
          
          {/* Pending */}
          {status.status === 'pending' && (
            <>
              <div className='text-5xl mb-4'>⏳</div>
              <h2 className='text-2xl font-semibold'>Application Under Review</h2>
              <p className='text-gray-500 mt-2'>
                We'll notify you once admin reviews your application.
              </p>
            </>
          )}

          {/* ✅ Approved - logout button */}
          {status.status === 'approved' && (
            <>
              <div className='text-5xl mb-4'>✅</div>
              <h2 className='text-2xl font-semibold text-green-600'>
                Application Approved!
              </h2>
              <p className='text-gray-500 mt-2'>
                Your application has been approved. Please logout and login again 
                to access your dashboard.
              </p>
              <button
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className='mt-4 px-6 py-2 bg-primary hover:bg-primary-dull 
                transition-all text-white rounded-lg cursor-pointer'
              >
                Logout & Login Again
              </button>
            </>
          )}

          {/* Rejected */}
          {status.status === 'rejected' && (
            <>
              <div className='text-5xl mb-4'>❌</div>
              <h2 className='text-2xl font-semibold text-red-500'>
                Application Rejected
              </h2>
              {status.adminNote && (
                <p className='text-gray-500 mt-2'>
                  Reason: {status.adminNote}
                </p>
              )}
            </>
          )}

        </div>
      </div>
    )
  }

  // Application Form
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16 mb-20'>
      <div className='max-w-xl mx-auto'>
        <h1 className='text-3xl font-bold mb-2'>Apply to List Your Car</h1>
        <p className='text-gray-500 mb-8'>
          Fill in your details. Admin will review and approve your application.
        </p>

        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div className='flex flex-col'>
            <label className='text-sm text-gray-600 mb-1'>Phone Number</label>
            <input
              required
              type="tel"
              placeholder='+92 300 1234567'
              className='border border-borderColor px-3 py-2 rounded-lg outline-none'
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-sm text-gray-600 mb-1'>CNIC Number</label>
            <input
              required
              type="text"
              placeholder='42101-1234567-1'
              className='border border-borderColor px-3 py-2 rounded-lg outline-none'
              value={form.cnicNumber}
              onChange={(e) => setForm({ ...form, cnicNumber: e.target.value })}
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-sm text-gray-600 mb-1'>Address</label>
            <input
              required
              type="text"
              placeholder='Your full address'
              className='border border-borderColor px-3 py-2 rounded-lg outline-none'
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-sm text-gray-600 mb-1'>
              Why do you want to list your car?
            </label>
            <textarea
              required
              rows={4}
              placeholder='Tell us about your car and why you want to list it...'
              className='border border-borderColor px-3 py-2 rounded-lg outline-none'
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className='bg-primary hover:bg-primary-dull text-white py-3 rounded-lg 
            font-medium transition-all cursor-pointer disabled:opacity-60'
          >
            {isLoading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ApplyOwner
