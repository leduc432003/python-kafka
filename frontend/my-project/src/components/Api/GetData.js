import axios from "axios";

export const getArticles = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:5000/article-management"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addArticle = async ({ title, image, summary, content }) => {
  const response = await fetch("http://127.0.0.1:5000/article-management/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      image,
      summary,
      content,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json = await response.json();

  return json;
};

export const updateArticle = async (articleId, updatedData) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/article-management/${articleId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    if (!response.ok) {
      throw new Error("Cập nhật bài viết không thành công");
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật bài viết: ${error.message}`);
  }
};

export const deleteArticle = async (articleId) => {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:5000/article-management/${articleId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getArticleById = async (id) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/article-management/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
