import React, { useEffect, useState } from "react";
import { getArticles } from "./Api/GetData";
import { Link } from "react-router-dom";

const Home = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu", error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div className="grid grid-cols-5 gap-5 p-3">
        {articles.map((article) => (
          <Link
            className="w-72 flex flex-col gap-3"
            to={`/article/${article.id}`}
          >
            <div className="h-64 w-64">
              <img
                src={`${article.image}`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-bold text-lg">{article.title}</h1>
            </div>
            <div>
              <p className="text-gray-500 text-sm">{article.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
