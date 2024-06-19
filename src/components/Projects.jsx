import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities';
import TechStack from '../utilities/TechStack';
import AOS from "aos";
import "aos/dist/aos.css";

const Projects = () => {
    const restPath = restBase + '/posts?_embed&acf_format=standard'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        AOS.init();
        AOS.refresh();
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
                {restData.map(post => (
                    <section key={post.id} id={`post-${post.id}`} 
                             className="projects-section" 
                             data-aos="slide-up" 
                             data-aos-delay={(post * 100).toString()} 
                    >
                        <div className="projects-heading">
                            <h1>{post.title.rendered}</h1>
                            {post.acf.cgt_portfolio_featured_project && typeof post.acf.cgt_portfolio_featured_project === 'string' && (
                                <video src={post.acf.cgt_portfolio_featured_project} type="video/mp4"></video>
                            )}
                        </div>
                        {post.acf && post.acf.cgt_portfolio_project_overview && (
                            <div dangerouslySetInnerHTML={{ __html: post.acf.cgt_portfolio_project_overview }} />
                        )}
                        {/* Render the tech stack icons using TechStack component */}
                        {post.acf.tech_stack && Array.isArray(post.acf.tech_stack) && post.acf.tech_stack[0] && (
                            <div>
                                {/* <h3>Tech Stack</h3> */}
                                <div className="stack-flex">
                                    <TechStack technologies={post.acf.tech_stack[0].tech_stack} />
                                </div>
                            </div>
                        )}   
                        <div className="button-container">
                            <Link to={`/projects/${post.slug}`} className="more-info-link">More Info</Link>
                        </div>        
                    </section>
                ))}
            </>
        : 
            <Loading />
        }
        </>
    )
}

export default Projects
