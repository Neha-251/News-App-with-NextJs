import Head from 'next/head'
import Loading from '../components/loading'
import Toolbox from '../components/toolbox'
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

export default function Home({ articles, pageNumber }) {
  console.log('articles', articles)

  const router = useRouter()

    const [pageLoading, setPageLoading] = useState(false);
    useEffect(() => {
        const handleStart = () => { setPageLoading(true); };
        const handleComplete = () => { setPageLoading(false); };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);
    }, [router]);


  return (
    <div className='w-full border-2 border-indigo-300 px-2 m-auto text-center justify-center flex'>
      <Head>
        <title>NewsFeed</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {pageLoading && <Loading/>}
      <Toolbox />

      <div className='w-full m-auto mt-20'>
        <p className='text-2xl my-4 text-orange-500'>Your One stop News destination</p>
        <div className='grid grid-cols-3 gap-4 mt-4 w-full h-screen overflow-y-scroll' >
          {
            articles.map((el, ind) => {

              return (
                <div key={ind} className='shadow-lg hover:shadow-2xl hover:shadow-green-300 p-1 text-left '>
                  <h2 className="text-xl m-2" onClick={() => window.location.href = `${el.url}`}>{el.title}</h2>
                  <img src={el.urlToImage} className='w-full' alt={el.title} />
                  <p className="text-sm my-2">{el.description}</p>
                  <p className="text-sm my-2">{el.content}</p>

                  <div className="text-right px-4">
                    <p className="text-xs">{el.publishedAt}</p>
                    <p className="text-xs">{el.author}</p>
                  </div>
                </div>

              )

            })
          }


        </div>
      </div>
    </div>
  )
}



export const getServerSideProps = async pageContext => {
  const pageNumber = 1;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
      return {
          props: {
              articles: [],
              pageNumber: 1
          }
      }
  }
  const res_data = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=100&page=${pageNumber}&apiKey=352635067946406c921645e918616993`)

  const data = await res_data.json();
  const { articles } = data;

  return {
      props: {
          articles,
          pageNumber
      }
  }
}
