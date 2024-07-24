import { TimeProp } from './App'

function Timer(props: { seconds: TimeProp }) {
    return (
        <div className='text-primary font-bold text-lg mt-5 float-right mx-5'>

            <h2>{props.seconds.maxMinutes}{props.seconds.minMinutes}:{props.seconds.maxSeconds}{props.seconds.miniSeconds}</h2>
        </div>
    )
}

export default Timer