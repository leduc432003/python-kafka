import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "./Api/GetData";

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(id);
        setArticle(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bài viết", error);
      }
    };
    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-3 px-10">
      <h1 className="font-bold text-3xl mb-4">{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
};

export default Article;
