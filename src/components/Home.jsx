import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities';

const Home = () => {
    const restPath = restBase + '/pages/12'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

    return (
        <>
        { isLoaded ? 
            <section id={`post-${restData.id}`}>
                <h1>{restData.acf.cgt_portfolio_name}</h1>
                        <p className="animated">{restData.acf.cgt_portoflio_job_title}</p>
            </section>
            :
            <Loading />
        }
        </>
    )
}

export default Home