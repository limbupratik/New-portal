import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Article(){
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(()=>{
    axios.get(`http://localhost:5000/api/news/${id}`)
      .then(res => setData(res.data));
  },[id]);

  if(!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p><b>{data.category}</b></p>
      {/* <img src={data.image} width="400"/> */}
      <img src={data.image} width="400" alt={data.title} />
      <p>{data.content}</p>
    </div>
  );
}
