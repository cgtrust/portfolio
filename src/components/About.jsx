import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities';
import TechStack from '../utilities/TechStack';
import pastelRainbowImage from '../assets/pastel-rainbow.png';

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
                <section>  
                    <div className="about-heading">
                        <div className="about-logo">
                            <img 
                                src={pastelRainbowImage} 
                                alt="Pastel rainbow background" 
                                className="about-logo-background"
                            />
                            <img 
                                src={restData.acf.cgt_portfolio_about_image.url} 
                                alt={restData.acf.cgt_portfolio_about_image.alt} 
                                className="about-logo-cat" 
                            />                    
                        </div>    
                        <div>             
                            <h1>{restData.acf.cgt_portfolio_about_name}</h1>
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
                        </div> 
                    </div>
                    {restData.acf && restData.acf.cgt_portfolio_about_text && (
                            <div dangerouslySetInnerHTML={{ __html: restData.acf.cgt_portfolio_about_text }} />
                        )}
                </section>
                <section className="stacks">
                {restData.acf.tech_stack && Array.isArray(restData.acf.tech_stack) && restData.acf.tech_stack[0] && (
                        <div>
                            <h2>Tech Stack</h2>
                            <div className="stack-flex">
                                <TechStack technologies={restData.acf.tech_stack[0].tech_stack} />
                            </div>
                        </div>
                    )}
                </section>
                <section className="stacks">
                {restData.acf.design_stack && Array.isArray(restData.acf.design_stack) && restData.acf.design_stack[0] && (
                        <div>
                            <h2>Design Stack</h2>
                            <div className="stack-flex">
                                <TechStack technologies={restData.acf.design_stack[0].design_stack} />
                            </div>
                        </div>
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