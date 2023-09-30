import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import ArticleList from "./components/ArticleList";
import Form from "./components/Form";
import NavBar from "./components/NavBar";

function App() {
  const [articles, setArticles] = useState([]);
  const [editArticle, setEditArticle] = useState("");
  const [token, setToken] = useCookies(["mytoken"]);
  let navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/articles/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "b83939290f562d8bf2ce9a0c58bd6a51dd74337a",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setArticles(resp))
      .catch((error) => console.log(error));
  }, []);

  const editBtn = (article) => {
    setEditArticle(article);
  };

  const updatedInformation = (article) => {
    const new_article = articles.map((myarticle) => {
      if (myarticle.id === article.id) {
        return article;
      } else {
        return myarticle;
      }
    });
    setArticles(new_article);
  };

  const articleForm = () => {
    setEditArticle({ title: "", description: "" });
  };

  const insertedInformation = (article) => {
    const new_articles = [...articles, article];
    setArticles(new_articles);
  };

  const deleteBtn = (article) => {
    const new_article = articles.filter((myarticle) => {
      if (myarticle.id === article.id) {
        return false;
      }
      return true;
    });
    setArticles(new_article);
  };

  useEffect(() => {
    var user_token = token["mytoken"];
    console.log("User token is", user_token);
    if (String(user_token) === "undefined") {
      navigate("/");
    } else {
      navigate("/articles");
    }
  }, [token]);

  // const logoutBtn = () => {
  //   removeToken(["mytoken"]);
  // };

  return (
    <div className="App">
      <NavBar />
      <br />

      <div className="row">
        <div className="col">
          <button className="btn btn-primary" onClick={articleForm}>
            Create Post
          </button>
        </div>
      </div>

      <ArticleList
        articles={articles}
        editBtn={editBtn}
        deleteBtn={deleteBtn}
      />
      <Form
        article={editArticle}
        updatedInformation={updatedInformation}
        insertedInformation={insertedInformation}
      />
    </div>
  );
}

export default App;
