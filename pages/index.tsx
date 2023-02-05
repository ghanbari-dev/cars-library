import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CategoryCard from "../components/CategoryCard";
import Header from "../components/Header";
import { selectCategories } from "../redux/categoriesSlice";
import { CategoryType } from "../types/dataTypes";

export default function Home() {
  const categories = useSelector(selectCategories);
  const router = useRouter();
  const [selectedCategories, setselectedCategories] = useState(categories);

  useEffect(() => {
    if (router.query?.category) {
      setselectedCategories(
        categories.filter((category) => category.id == router.query.category)
      );
    } else {
      setselectedCategories(categories);
    }
  }, [router.query?.category]);

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      <Header title="Dashboard" />
      <div className="overflow-y-auto flex-grow flex flex-col gap-6 p-5">
        {selectedCategories.length > 0 ? (
          selectedCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        ) : (
          <div>no category</div>
        )}
      </div>
    </div>
  );
}
