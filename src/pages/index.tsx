import AppLayout from '../components/layout';

export default function HomePage() {
    return (
        <AppLayout>
        <h1 style={{ color: '#007acc', marginBottom: 12 }}> Welcome Grilled Fish </h1>
        <p style={{ fontSize: 16, color: '#555' }}>
            Press 3 lines to select the menu.
        </p>
                <img
        src="/clgm-listing.jpg"
        alt="Listing"
        style={{
            width: '100%',    
            maxWidth: 400,    
            height: 'auto',    
            borderRadius: 8,  
            display: 'block', 
            marginTop: 16,
        }}
    />
        </AppLayout>
    );
    }
