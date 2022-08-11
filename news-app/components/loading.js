


const Loading = () => {

    return (
        <div className='fixed bg-slate-700 z-10 opacity-80 flex justify-center top-0 left-0 h-full w-full '>
            <div className="flex z-30 opacity-100 m-auto">
                <svg className="z-30 opacity-100 animate-spin bg-pink-700 h-8 w-8 mr-3" viewBox="0 0 24 24">
                </svg>
                <p className='text-2xl text-amber-700 font-semibold'>Loading</p>
                <div className='z-30 h-1.5 w-1.5 mt-5 mx-0.5 rounded-full bg-amber-600 animate-bounce'></div>
                <div className='z-30 h-1.5 w-1.5 mt-5 mx-0.5 rounded-full bg-amber-600 animate-bounce'></div>
                <div className='z-30 h-1.5 w-1.5 mt-5 mx-0.5 rounded-full bg-amber-600 animate-bounce'></div>
            </div>
        </div>
    )

}

export default Loading;