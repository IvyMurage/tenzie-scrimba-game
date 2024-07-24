function Die(props: { value: number }) {
    return (
        <div className='p-2 shadow-md rounded-md w-9 cursor-pointer flex items-center justify-center text-md font-bold bg-white'><h2>{props.value}</h2></div>
    )
}

export default Die