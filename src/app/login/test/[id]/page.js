'use client'
import React from 'react';
import { useRouter } from 'next/router';


export default function page({children}) {

  const router = useRouter();
    

  const prestataireId = router.query.id; 
  
  

  return (
    <>
       <h1>Test</h1>
       <p>ID du prestataire : {prestataireId}</p>
    </>
  )
}


