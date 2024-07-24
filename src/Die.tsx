function Die(props: { value: number, styles: { [key: string]: string }, holdDice: () => void }) {
    return (
        <div style={props.styles} className='p-2 shadow-md rounded-md w-9 cursor-pointer flex items-center justify-center text-md font-bold bg-white' onClick={props.holdDice}><h2>{props.value}</h2></div>
    )
}

export default Die