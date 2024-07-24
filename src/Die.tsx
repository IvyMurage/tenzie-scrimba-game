function Die(props: { value: number }) {
    return (
        <div className='p-2 shadow-md rounded-md w-9 flex items-center justify-center text-md font-bold bg-white'>{props.value}</div>
    )
}

export default Die