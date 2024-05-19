import React, { useEffect, useState } from "react";
import { deleteArticle, getArticles } from "./Api/GetData";
import { Link } from "react-router-dom";
import AddArticleForm from "./AddArticleForm";
import UpdateArticleForm from "./UpdateArticleForm";
import ConfirmDialog from "./ConfirmDialog";

const Section = () => {
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
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
  const handleAddArticle = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsUpdateModalOpen(false);
  };

  const handleAddSuccess = () => {
    setIsModalOpen(false);
  };

  const handleEditArticle = (article) => {
    setSelectedArticle(article);
    setIsUpdateModalOpen(true);
  };
  const deleteArticleById = async (articleId) => {
    try {
      await deleteArticle(articleId);
      setArticles(articles.filter((article) => article.id !== articleId));
      setIsConfirmOpen(false);
    } catch (error) {
      console.error("Lỗi khi xóa bài viết", error);
    }
  };

  return (
    <>
      <div className="text-right p-3">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleAddArticle}
        >
          Thêm bài viết
        </button>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Tiêu đề bài viết
              </th>
              <th scope="col" class="px-6 py-3">
                Hình ảnh
              </th>
              <th scope="col" class="px-6 py-3">
                Tóm tắt
              </th>
              <th scope="col" class="px-6 py-3">
                Nội dung
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr
                key={article.id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {article.title}
                </th>
                <th class="px-6 py-4">
                  <div className="w-20">
                    <img
                      src={`${article.image}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </th>
                <th class="px-6 py-4">{article.summary}</th>
                <th class="px-6 py-4 three-lines">{article.content}</th>
                <th class="px-6 py-4">
                  <button
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleEditArticle(article)}
                  >
                    Sửa
                  </button>
                </th>
                <th class="px-6 py-4">
                  <button
                    href="#"
                    class="font-medium text-red-500 dark:text-blue-500 hover:underline"
                    onClick={() => {
                      setSelectedArticle(article);
                      setIsConfirmOpen(true);
                    }}
                  >
                    Xóa
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddArticleForm
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddSuccess}
      />
      <UpdateArticleForm
        isOpen={isUpdateModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddSuccess}
        article={selectedArticle}
      />
      {isConfirmOpen && selectedArticle && (
        <ConfirmDialog
          message="Bạn có muốn xóa bài viết này không?"
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={() => deleteArticleById(selectedArticle.id)}
        />
      )}
    </>
  );
};

export default Section;
