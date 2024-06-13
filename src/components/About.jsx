import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities';

const About = () => {
    const restPath = restBase + '/pages/36?acf_format=standard&_embed'
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
            <article id={`post-${restData.id}`}>
                <h1>{restData.title.rendered}</h1>
                <section>                    
                    <img src={restData.acf.cgt_portfolio_about_image.url} alt={restData.acf.cgt_portfolio_about_image.alt} className="about-logo" />                    
                    <h2>{restData.acf.cgt_portfolio_about_name}</h2>
                    {/* Insert the icons here */}
                    {restData.acf.cgt_portfolio_about_icons && Array.isArray(restData.acf.cgt_portfolio_about_icons) && (
                        <div className="icon-gallery">
                            {restData.acf.cgt_portfolio_about_icons.map((iconItem, index) => (
                                <img 
                                    key={index}
                                    src={iconItem.icons.url}  // Assuming 'icons' is the sub-field containing URL and alt
                                    alt={iconItem.icons.alt || `Icon ${index + 1}`}
                                    className="gallery-icons"
                                />
                            ))}
                        </div>
                    )}
                    {restData.acf && restData.acf.cgt_portfolio_about_text && (
                            <div dangerouslySetInnerHTML={{ __html: restData.acf.cgt_portfolio_about_text }} />
                        )}
                </section>
            </article>
            :
            <Loading />
        }
        </>
    )
}

export default About