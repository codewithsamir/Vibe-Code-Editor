import React from 'react'

const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <main className='flex justify-center items-center min-h-screen flex-col bg-zinc-800'>{children}</main>
  )
}

export default layout