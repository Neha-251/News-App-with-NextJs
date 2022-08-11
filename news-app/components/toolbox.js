import {useRouter} from 'next/router';


const Toolbox = () => {
    const router = useRouter();

    return (
        <div className='fixed py-2 w-full bg-gray-700 text-red-400 justify-around top-0 flex text-xl'>
            <div className='hover:text-green-600 cursor-pointer m-2 text-2xl text-amber-500 font-bold'>NewsFeed</div>
            <div className='hover:text-green-600 cursor-pointer m-2' onClick={()=> router.push('/')}>Home</div>
            <div className='hover:text-green-600 cursor-pointer m-2' onClick={()=> router.push('/feed/1')}>Feed</div>
            
        </div>
    )
}

export default Toolbox