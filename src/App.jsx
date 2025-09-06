import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './Pages/Layout.jsx'
import Home from './Pages/Home/Home';
import Details from './Pages/Details/Details.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const routes = createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true,element:<Home/>},
    {path:'meal/:id',element:<Details/>}
  ]}
])

const queryClient = new QueryClient()

export default function App() {

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={routes}/>
    </QueryClientProvider>
    </>
  )
}


