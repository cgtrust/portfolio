import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities';

const Projects = () => {
    const restPath = restBase + '/posts?_embed'
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
            <>
                <h1>Projects</h1>
                {restData.map(post => 
                    <article key={post.id} id={`post-${post.id}`}>
                        <h2>{post.title.rendered}</h2>
                        <video src={post.acf.cgt_portfolio_featured_project} type="video/mp4"></video>
                        <p>{post.acf.cgt_portfolio_project_overview}</p>                       
                        <Link to={`/projects/${post.slug}`}>More Info</Link>
                    </article>
                )}
            </>
        : 
            <Loading />
        }
        </>
    )
}

export default Projects