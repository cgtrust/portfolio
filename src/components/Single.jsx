import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'
import TabsComponent from '../utilities/Tabs'

const Single = () => {
    const {slug} = useParams()
    const restPath = restBase + `/posts?slug=${slug}&_embed`
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    const [prevPost, setPrevPost] = useState(null)
    const [nextPost, setNextPost] = useState(null)

    console.log('restData:', restData);



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

    const fetchAdjacentPosts = async (post) => {
        try {
            const currentDate = new Date(post.date)
            const prevPostResponse = await fetch(`${restBase}/posts?_embed&per_page=1&before=${currentDate.toISOString()}&order=desc`)
            const nextPostResponse = await fetch(`${restBase}/posts?_embed&per_page=1&after=${currentDate.toISOString()}&order=asc`)
            if (prevPostResponse.ok) {
                const prevPostData = await prevPostResponse.json()
                setPrevPost(prevPostData[0])
            }
            if (nextPostResponse.ok) {
                const nextPostData = await nextPostResponse.json()
                setNextPost(nextPostData[0])
            }
        } catch (error) {
            console.error('Error fetching adjacent posts:', error)
        }
    }

    return (
        <>
        { isLoaded ?
            <>
                <article id={`post-${restData.id}`}>
                    <h1>{restData.title.rendered}</h1>
                    {/* Video is showing on inspector, but you can't see anything */}
                    <video src={restData.acf.cgt_portfolio_featured_project} type="video/mp4"></video>
                    <p>{restData.acf.cgt_portfolio_project_overview}</p>
                    <div>
                        <TabsComponent 
                            requirements={restData.acf.cgt_portfolio_project_requirements}
                            reflection={restData.acf.cgt_portfolio_reflection}  
                        />
                    </div>
                </article>
                {/* Below is currently not showing up */}
                <nav className="posts-navigation">
                    {prevPost &&
                        <Link to={`/projects/${prevPost.slug}`} className="prev-post">Previous: {prevPost.title?.rendered}</Link>
                    }
                    {nextPost &&
                        <Link to={`/projects/${nextPost.slug}`} className="next-post">Next: {nextPost.title?.rendered}</Link>
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