export interface User{
    id: string
    name: string
    email: string
    image: string
    role: string
    createAt : Date
    updateAt: Date
}

export interface Project {
    id: string
    title: string
    description: string
    template: string
    createdAt: Date
    updateAt: Date 
    userId : string 
    user : User
    Starmark: { isMarked: boolean}[]
}