'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from 'next/image';

const ArticleContainer = ({ apiKey }) => {
  const [articles, setArticles] = useState([]);
  const [popularBy, setPopularBy] = useState('viewed');
  const [period, setPeriod] = useState('7');

  const fetchArticles = async () => {
    try {
      const response = await fetch(`https://api.nytimes.com/svc/mostpopular/v2/${popularBy}/${period}.json?api-key=${apiKey}`);
      const data = await response.json();
      setArticles(data.results);
      console.log(data);
    } catch (error) {

    }
  };

  const handlePopularChange = (event) => {
    const value = event.target.value;
    setPopularBy(value);
    fetchArticles();
  }
  const handlePeriodChange = (event) => {
    const value = event.target.value;
    setPeriod(value);
    fetchArticles();
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className='m-4'>
      <div className="popular-by flex justify-between">
        <h3 className='p-6'>Most Popular Stories This Week</h3>
        <div className="filter-container flex">

        <select onChange={() => handlePopularChange(event)} className="select p-4 m-3">
          <option value="viewed">Most Viewed</option>
          <option value="shared">Most Shared</option>
          <option value="emailed">Most Emailed</option>
        </select>
        <select id='periodFilter' name='periodFilter' onChange={() => handlePeriodChange(event)} className="select p-4 my-3">
          <option value="1">Today</option>
          <option value="7">This Week</option>
          <option value="30">This Month</option>
        </select>
        </div>


      </div>
      <div className='flex flex-wrap justify-center gap-10'>
        {articles ? (
          articles.map((article) => (
            <Link href={article.url}>

              <div className=' p-4 bg-slate-100 rounded-md w-[300px]' key={article.id}>
                <p className="date m-3 text-xs font-bold">{article.published_date}</p>

                <h2 className='text-xl font-bold m-3'>{article.title}</h2>

                {/* Only try and put the image in if its available */}
                {article.media && article.media.length > 0 && article.media[0]['media-metadata'] && article.media[0]['media-metadata'].length > 1 && (
                  <Image
                    src={article.media[0]['media-metadata'][2].url}
                    alt={article.title}
                    width={300}
                    height={300}
                  />
                )}
                <p className='font-extralight mt-3 '>{article.abstract}</p>

              </div>
            </Link>
          ))
        ) : (
          <div className='m-4 p-4 bg-slate-100 rounded-md'><p>
            Loading...
          </p>
          </div>
        )}
      </div>
    </div>
  );
};


export default ArticleContainer;