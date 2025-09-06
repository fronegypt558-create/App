import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axios from 'axios'
import { Link, useSearchParams } from 'react-router'

export default function Allcategories() {

  const [searchParams] = useSearchParams()
  let cat = searchParams.get('c') || "Beef"

  function getAllCategory(){
    return axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
  }

  const {data, isLoading}=useQuery({
    queryKey:['all-categories'],
    queryFn:getAllCategory,
    select:(data)=>data?.data?.meals
  })
  
  if(isLoading){
    return (
        <span className="loader center"></span>
    )
  }
  
  return (
    <div className='flex flex-row gap-3 flex-wrap w-[90%%]'>
        {data?.map((categ)=><>
                <Link to={`?c=${categ.strCategory}`} className={`p-4 bg-amber-50 border-2 rounded-2xl cursor-pointer hover:bg-amber-500 transition-all duration-300 ${cat==categ.strCategory?"bg-amber-600":""}`}>
                {categ?.strCategory}
                </Link>
        </>)}
    </div>
  )
}
