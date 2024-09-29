import React, { useEffect, useState } from 'react'

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [isFact, setIsFact] = useState('');
  const [search, setSearch] = useState('');
  const [isGift, setIsGift] = useState([]);
  useEffect(() => {
    async function catFact() {
      const res = await fetch('https://catfact.ninja/fact');
      const data = await res.json();
      setIsFact(data.fact);
      setSearch(data.fact.split(" ",3).join(' '));
    }
   
    catFact();

  },[])
  useEffect(() => {
    async function git() {
      const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}`);      
      const data = await res.json();
      setIsGift(data?.data[0]?.images.original.url)
    }
    git();
  } ,[search])
  return (
    <div className='container'>
      <div className='fact'>
        <p>{isFact}</p>
      </div>
      <figure className='gif'>
        <img src={isGift} alt="" />

      </figure>
    </div>
  )
}

export default App