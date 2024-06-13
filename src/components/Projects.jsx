import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities';
import TechStack from '../utilities/TechStack';

const Projects = ({ post }) => {
    const restPath = restBase + '/posts?_embed&acf_format=standard'
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
                {restData.map(post => (
                    <article key={post.id} id={`post-${post.id}`}>
                        <h2>{post.title.rendered}</h2>
                        {post.acf.cgt_portfolio_featured_project && typeof post.acf.cgt_portfolio_featured_project === 'string' && (
                            <video src={post.acf.cgt_portfolio_featured_project} type="video/mp4"></video>
                        )}
                        {/* Render the tech stack icons using TechStack component */}
                        {post.acf.tech_stack && Array.isArray(post.acf.tech_stack) && post.acf.tech_stack[0] && (
                            <div>
                                <h3>Tech Stack:</h3>
                                <TechStack technologies={post.acf.tech_stack[0].tech_stack} />
                            </div>
                        )}           
                        {post.acf && post.acf.cgt_portfolio_project_overview && (
                            <div dangerouslySetInnerHTML={{ __html: post.acf.cgt_portfolio_project_overview }} />
                        )}
                        <Link to={`/projects/${post.slug}`}>More Info</Link>
                    </article>
                ))}
            </>
        : 
            <Loading />
        }
        </>
    )
}

export default Projects
