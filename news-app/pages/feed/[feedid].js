import Toolbox from "../../components/toolbox";
import Image from "next/image";
import Head from "next/dist/shared/lib/head";
import { useRouter } from "next/router";
import Loading from "../../components/loading";
import { useEffect, useState } from "react";


const Feed = ({ pageNumber, articles }) => {
   
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
        <div className='w-full border-2 border-indigo-300 px-2 m-auto text-center justify-center flex-col flex'>
            <Toolbox />
            {pageLoading && <Loading />}
            <Head>
                <meta property="og:image" content={articles[0]?.urlToImage} />
                <meta property="og:description" content={articles[0]?.description} />
                <meta property="og:title" content={articles[0]?.title + ' and more!'} />
            </Head>

            <div className='grid grid-cols-1 gap-2 mt-20 w-full m-auto'>
                {
                    articles.map((el, ind) => {

                        return (
                            <div key={ind} className='border-2 p-1 text-left border-black'>
                                <h2 className="text-3xl cursor-pointer mb-4" onClick={() => window.location.href = `${el.url}`}>{el.title}</h2>
                                <img src={el.urlToImage} className='w-3/4 m-auto' alt={el.title} />
                                <p className="text-xl my-2 indent-1.5">{el.description}</p>
                                <p className="text-xl my-2">{el.content}</p>

                                <div className="text-right px-4">
                                    <p className="text-sm ">{el.publishedAt}</p>
                                    <p className="text-sm ">{el.author}</p>
                                </div>
                            </div>

                        )

                    })
                }

            </div>
            <div className="my-3">
                <span className={pageNumber <= 1 ? 'hidden' : "py-1 px-3 cursor-pointer border-2 border-red-400 text-red-400 hover:text-green-600 hover:border-green-600"}
                    onClick={() => pageNumber > 1 && router.push(`/feed/${+pageNumber - 1}`)}>Prev</span>
                <span className="py-1 px-3 cursor-pointer border-2 border-red-400 text-red-400 hover:text-green-600 hover:border-green-600"
                >{pageNumber}</span>
                <span className={pageNumber >= 5 ? 'hidden' : "py-1 px-3 cursor-pointer border-2 border-red-400 text-red-400 hover:text-green-600 hover:border-green-600"}
                    onClick={() => pageNumber < 5 && router.push(`/feed/${+pageNumber + 1}`)}>Next</span>
            </div>
        </div>
    )
}


export default Feed;

export const getServerSideProps = async pageContext => {
    const pageNumber = pageContext.query.feedid;

    if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
        return {
            props: {
                articles: [],
                pageNumber: 1
            }
        }
    }
    const res_data = await fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}&apiKey=352635067946406c921645e918616993`)

    const data = await res_data.json();
    const { articles } = data;

    return {
        props: {
            articles,
            pageNumber
        }
    }
}