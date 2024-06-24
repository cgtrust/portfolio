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
                <article id={`post-${restData.id}`} className="top">
                    <h1>{restData.title.rendered}</h1>
                    {restData.acf.cgt_portfolio_featured_project && typeof restData.acf.cgt_portfolio_featured_project === 'string' && (
                        <div className="video-container">
                            <video autoPlay muted src={restData.acf.cgt_portfolio_featured_project} type="video/mp4"></video>
                        </div>
                    )}
                    <div className="single-links button-container">
                        <Link to={restData.acf.cgt_portfolio_git_repo_link} >Git Repo</Link>
                        <Link to={restData.acf.cgt_portfolio_live_site_link} >Live Site</Link>
                    </div>
                    <div className="project-overview">
                        {restData.acf.cgt_portfolio_project_overview && (
                            <p dangerouslySetInnerHTML={{ __html: restData.acf.cgt_portfolio_project_overview }} />
                        )}
                        {restData.acf.tech_stack && Array.isArray(restData.acf.tech_stack) && restData.acf.tech_stack[0] && (
                            <div className="stack-flex">
                                {/* <h2>Tech Stack:</h2> */}
                                <TechStack technologies={restData.acf.tech_stack[0].tech_stack} />
                            </div>
                        )}
                    </div>
                    <div>
                        <TabsComponent 
                            requirements={restData.acf.cgt_portfolio_project_requirements}
                            reflection={restData.acf.cgt_portfolio_reflection && (
                                <p dangerouslySetInnerHTML={{__html: restData.acf.cgt_portfolio_reflection}} />
                            )}
                        />
                    </div>
                </article>
                
                <nav className="posts-navigation">
                    {restData.previous_post &&
                        <Link to={`/projects/${restData.previous_post.slug}`} className="prev-post"> {restData.previous_post.title}</Link>
                    }
                    {restData.next_post &&
                        <Link to={`/projects/${restData.next_post.slug}`} className="next-post"> {restData.next_post.title}</Link>
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