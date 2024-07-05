import loading from '../assets/loading.gif'

const Loading = () => {
    // The css file is loading after the loading file. 
    // This is the reason for the in-line styling.
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#191c19',
            zIndex: '9999'
        }}>
            <img 
                src={loading} 
                alt="Loading" 
                className="loading" 
                id="loading"
                style={{
                    display: 'block',
                    margin: 'auto'
                }}
            />
        </div>
    )
}

export default Loading