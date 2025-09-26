import { deleteProjectById, duplicateProjectById, editProjecctById, getAllPlaygroundForUser } from '@/modules/dashboard/actions'
import AddNewButton from '@/modules/dashboard/components/AddNewButton'
import AddRepo from '@/modules/dashboard/components/AddRepo'
import EmptyState from '@/modules/dashboard/components/empty-state'
import ProjectTable from '@/modules/dashboard/components/ProjectTable'
import React from 'react'

const page = async() => {
  const playgrounds = await getAllPlaygroundForUser()
  // console.log(playgrounds)
  return (
   <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <AddNewButton />
      <AddRepo />
    </div>

    <div className="mt-10 flex flex-col justify-center items-center w-full">
      {playgrounds && playgrounds.length === 0 ? (
        <EmptyState />
      ) : (
        <ProjectTable 
        projects={playgrounds || []}
        onDeleteProject={deleteProjectById}
        onUpdateProject={editProjecctById}
        onDuplicateProject={duplicateProjectById}
        // onMarkasFavorite={()=>{}}
        
/>
      )}
    </div>
   </div>
  )
}

export default page