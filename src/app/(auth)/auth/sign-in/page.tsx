import SignInFormClient from '@/modules/auth/components/sign-in-form-client'

import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='flex  justify-center items-center'>
    <Image src="/login.svg" alt="login" width={300} height={300} className='m-6 object-cover'/>
    <SignInFormClient />
    
    </div>
  )
}

export default page