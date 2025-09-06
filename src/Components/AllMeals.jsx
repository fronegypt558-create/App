
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link, useSearchParams } from 'react-router'

export default function AllMeals() {

  const [searchParams] = useSearchParams()
  let cat = searchParams.get('c') || "Beef"

  function getAllMeals(){
    return axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
  }

  const {data,isLoading} = useQuery({
    queryKey:['all-meals', cat],
    queryFn:getAllMeals,
    select:(data)=>data?.data?.meals
  })

  if(isLoading){
    return <span className="loader center"></span>
  }


  return (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 mt-6 w-full">
        {data?.map((meal) => (
          <div
            key={meal.idMeal}
            className="p-4 rounded-2xl shadow-md border hover:shadow-lg transition bg-white flex flex-col items-center"
          >
            {/* Meal Image */}
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />

            {/* Meal Name */}
            <h3 className="font-semibold text-lg text-center mb-3">{meal.strMeal}</h3>

            {/* View Details Button */}
            <Link
              className="px-4 py-2 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition"
              to={`/meal/${meal.idMeal}`}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
  )
}
