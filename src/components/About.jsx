import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities';
import TechStack from '../utilities/TechStack';
import { Helmet } from 'react-helmet-async';
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
    const restPath = restBase + '/pages/36?acf_format=standard&_embed'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    // Ensure restData and restData.acf are defined before accessing their properties
    const metaDescription = restData && restData.acf && restData.acf.cgt_portfolio_meta_description;
    const metaTitle = restData && restData.acf && restData.acf.cgt_portfolio_meta_title;

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
        <Helmet>
            <meta name="description" content={metaDescription} />
            <title>{metaTitle}</title>
        </Helmet>
        { isLoaded ? 
            <article id={`post-${restData.id}`} className="top">
                <section data-aos="flip-up" 
                         data-aos-delay={(restData * 100).toString()} 
                >  
                    <div className="about-heading">
                        <div className="about-logo">
                            <img 
                                src={restData.acf.background_image.url} 
                                alt={restData.acf.background_image.alt} 
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
                                            src={iconItem.icons.url}
                                            alt={iconItem.icons.alt || `Icon ${index + 1}`}
                                            className="gallery-icons"
                                        />
                                    ))}
                            </div>
                        )}
                        </div> 
                    </div>
                    {restData.acf && restData.acf.cgt_portfolio_about_text && (
                        restData.acf.cgt_portfolio_about_text.split('</p>').map((paragraph, index) => (
                            paragraph && <div 
                                key={index} 
                                dangerouslySetInnerHTML={{ __html: paragraph + '</p>' }} 
                                data-aos="slide-up" 
                                data-aos-delay={index * 100}  // Add a delay for each paragraph
                            />
                        ))
                    )}
                </section>
                <section className="stacks" 
                         data-aos="flip-up" 
                         data-aos-delay={(restData * 100).toString()}>
                {restData.acf.tech_stack && Array.isArray(restData.acf.tech_stack) && restData.acf.tech_stack[0] && (
                        <div>
                            <h2>Tech Stack</h2>
                            <div className="stack-flex" >
                                <TechStack technologies={restData.acf.tech_stack[0].tech_stack} />
                            </div>
                        </div>
                    )}
                </section>
                <section className="stacks"
                         data-aos="flip-up" 
                         data-aos-delay={(restData * 100).toString()}
                >
                {restData.acf.design_stack && Array.isArray(restData.acf.design_stack) && restData.acf.design_stack[0] && (
                        <div>
                            <h2>Design Stack</h2>
                            <div className="stack-flex" >
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