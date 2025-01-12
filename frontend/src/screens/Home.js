import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Card from '../Components/Card'
import { Carousel } from '../Components/Carousel'
import { useEffect, useState } from 'react'
export default function Home (){

const [FoodCategory,setFoodCategory] = useState([]);
const [FoodItem,setFoodItem] = useState([]);
const loadData = async()=>{
  let response = await fetch("http://localhost:5000/api/foodData",{
    method: "POST",
    headers:{
      'Content-Type':'application/json'
    }
  })
  response = await response.json();
  console.log(response[0],response[1])
}
useEffect(()=>{
  loadData()
},[])






  return (
    <div>
      <div><Navbar/></div>
      <div><Carousel/></div>
      <div className='m-3'>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>

        </div>
      <div><Footer/></div>

    </div>
  )
}


