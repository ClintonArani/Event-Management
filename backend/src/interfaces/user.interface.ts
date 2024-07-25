export interface user{
    id:string,
    firstName:string,
    lastName:string,
    phoneNumber:string,
    email:string,
    password:string,
    profile:string,
    role:string,
    createdAt:string
}

export interface login_details{
    email:string,
    password:string
}

export interface token_datails{
    id:string,
    firstName:string,
    lastName:string,
    email:string,
    role:string
}