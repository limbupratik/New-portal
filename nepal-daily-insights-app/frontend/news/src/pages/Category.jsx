import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";

export default function Category() {
  const { name } = useParams();
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/news/category/${name}`)
      .then(res => setNews(res.data));
  }, [name]);

  return (
    <div>
      <h2>{name} News</h2>
      {news.map(n => <NewsCard key={n._id} data={n} />)}
    </div>
  );
}
