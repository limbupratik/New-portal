import { useState } from "react";
import axios from "axios";

export default function Admin(){
  const [form, setForm] = useState({
    title:"", content:"", category:"", image:"", author:"Admin"
  });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/news", form)
      .then(()=>alert("News added!"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add News</h2>
      <input placeholder="Title" onChange={e=>setForm({...form,title:e.target.value})}/>
      <textarea placeholder="Content" onChange={e=>setForm({...form,content:e.target.value})}/>
      <input placeholder="Category" onChange={e=>setForm({...form,category:e.target.value})}/>
      <input placeholder="Image URL" onChange={e=>setForm({...form,image:e.target.value})}/>
      <button>Add</button>
    </form>
  );
}
