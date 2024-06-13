import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'
import TabsComponent from '../utilities/Tabs'
import TechStack from '../utilities/TechStack'

const Single = () => {
    const {slug} = useParams()
    const restPath = restBase + `/posts?slug=${slug}&_embed&acf_format=standard`
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if (response.ok) {
                const data = await response.json()
                setData(data[0])
                setLoadStatus(true)
                fetchAdjacentPosts(data[0])
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
                <article id={`post-${restData.id}`}>
                    <h1>{restData.title.rendered}</h1>
                    {restData.acf.cgt_portfolio_featured_project && typeof restData.acf.cgt_portfolio_featured_project === 'string' && (
                            <video src={restData.acf.cgt_portfolio_featured_project} type="video/mp4"></video>
                        )}
                    {restData.acf.cgt_portfolio_project_overview && (
                        <p dangerouslySetInnerHTML={{ __html: restData.acf.cgt_portfolio_project_overview }} />
                    )}
                    {restData.acf.tech_stack && Array.isArray(restData.acf.tech_stack) && restData.acf.tech_stack[0] && (
                        <div>
                            <h2>Tech Stack:</h2>
                            <TechStack technologies={restData.acf.tech_stack[0].tech_stack} />
                        </div>
                    )}
                    <div>
                        <TabsComponent 
                            requirements={restData.acf.cgt_portfolio_project_requirements}
                            reflection={restData.acf.cgt_portfolio_reflection && (
                                <div className="reflection" dangerouslySetInnerHTML={{__html: restData.acf.cgt_portfolio_reflection}} />
                            )}  
                        />
                    </div>
                </article>
                
                <nav className="posts-navigation">
                        {restData.previous_post &&
                            <Link to={`/projects/${restData.previous_post.slug}`} className="prev-post">Previous: {restData.previous_post.title}</Link>
                        }
                        {restData.next_post &&
                            <Link to={`/projects/${restData.next_post.slug}`} className="next-post">Next: {restData.next_post.title}</Link>
                        }
                    </nav>
            </>
        : 
            <Loading />
        }
        </>
    )
}

export default Single