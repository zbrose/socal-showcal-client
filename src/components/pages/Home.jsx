import Event from '../Event'

function Home({events, setTrigger, currentUser}) {

const eventsList = events.map((event,i)=>{
    return <div key={`keyone=${i}`}><Event setTrigger={setTrigger} event={event} currentUser={currentUser}/></div>
})

    return ( 
        <>
        {/* <Link to={'/events/new'}>Create an event</Link> */}
            <div className="flex-container">
                {eventsList}
            </div>
        </>

     )
}

export default Home;