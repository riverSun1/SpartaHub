import React from 'react'
import supabase from '../../supabaseClient'

export const handleDelete = () => {
 const {data,error} = supabase.from("noticeboard").delete()
 .eq("data")
 if(error){
    console.log("error" , error)
 }
}


