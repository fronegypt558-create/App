import Allcategories from '../../Components/Allcategories'
import AllMeals from '../../Components/AllMeals'

export default function Home() {
  return (
    <div className='flex felx-row flex-wrap gap-8'>
      <h1 className='text-3xl font-semibold w-full text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-300'>Learn ,Cook ,Eate your Food</h1>
      <Allcategories/>
      <AllMeals/>
    </div>
  )
}
