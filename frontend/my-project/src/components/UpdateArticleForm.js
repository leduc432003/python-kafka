import React, { useState, useEffect } from "react";
import { updateArticle } from "./Api/GetData";

const UpdateArticleForm = ({ isOpen, onClose, onAdd, article }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setImage(article.image);
      setSummary(article.summary);
      setContent(article.content);
    }
  }, [article]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateArticle(article.id, { title, image, summary, content });
      setTitle("");
      setImage("");
      setSummary("");
      setContent("");
      onAdd();
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <button className="absolute top-0 right-0 p-3" onClick={onClose}>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div className="flex flex-col gap-2">
                  <span>Tiêu để</span>
                  <span>Hình ảnh</span>
                  <span>Tóm tắt</span>
                  <span>Nội dung</span>
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border-2 rounded-md"
                  />
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                    className="border-2 rounded-md"
                  />
                  <input
                    type="text"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    required
                    className="border-2 rounded-md"
                  />
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="border-2 rounded-md"
                  ></textarea>
                </div>
              </div>
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5"
                type="submit"
              >
                Cập nhật bài viết
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateArticleForm;
