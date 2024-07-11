import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities';

const Home = () => {
    const restPath = restBase + '/pages/12'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
     // Ensure restData and restData.acf are defined before accessing their properties
    const metaDescription = restData && restData.acf && restData.acf.cgt_portfolio_meta_description;
    const metaTitle = restData && restData.acf && restData.acf.cgt_portfolio_meta_title;

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
        <Helmet>
            <meta name="description" content={metaDescription} />
            <title>{metaTitle}</title>
        </Helmet>
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