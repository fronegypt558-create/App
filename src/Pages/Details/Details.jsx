import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router";

export default function Details() {
  const { id } = useParams();

  function getMealDetails() {
    return axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
  }

  const { data, isLoading } = useQuery({
    queryKey: ["meal-details", id],
    queryFn: getMealDetails,
    select: (data) => data?.data?.meals?.[0],
  });

  if (isLoading) {
    return <span className="loader center"></span>;
  }

  if (!data) return <h2 className="text-center text-red-500">No data found</h2>;

  // extract ingredients + measures while using the loop
  // target 
  // [
  //   {ing:'name of ing',measure:'ammount'}
  //   {ing:'name of ing',measure:'ammount'}
  //   {ing:'name of ing',measure:'ammount'}
  // ]

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = data[`strIngredient${i}`];
    const measure = data[`strMeasure${i}`];
    if (ing && ing.trim() !== "") {
      ingredients.push({ ing, measure });
    }
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        {data.strMeal}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {/* Left: image */}
        <div className="w-full">
          <img
            src={data.strMealThumb}
            alt={data.strMeal}
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Middle: instructions */}
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {data.strInstructions}
        </div>

        {/* Right: ingredients (sticky only on large screens) */}
        <div className="md:col-span-1">
          <div className="lg:sticky lg:top-6">
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
              {ingredients.map((item, indx) => (
                <div
                  key={indx}
                  className="flex justify-between px-4 py-2 border-b last:border-b-0"
                >
                  <span className="font-medium">{item.ing}</span>
                  <span className="text-gray-600">{item.measure}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
