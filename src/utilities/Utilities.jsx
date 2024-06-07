export const restBase = 'https://cgtwebdesigns.com/hadkowpnk/wp-json/wp/v2'

export const RequirementComponent = ({ htmlContent }) => {
    return (
        <p dangerouslySetInnerHTML={{ __html: htmlContent }} />
    )
}