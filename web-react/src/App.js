import React, { useEffect, useState } from 'react';

function App() {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        // Fetch the initial offers
        const fetchInitialOffers = async () => {
          const response = await fetch('http://localhost:3001/offers');
          const initialOffers = await response.json();
          setOffers(initialOffers);
        };

        fetchInitialOffers();

        // Connect to the SSE endpoint
        const eventSource = new EventSource('http://localhost:3001/offers/events');

        // Listen for messages (new offers)
        eventSource.onmessage = (event) => {
          const newOfferList = JSON.parse(event.data);
          setOffers(newOfferList);
        };

        // Cleanup on component unmount
        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div className="App">
            <h1>Offers Table</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th colSpan="3">Offer</th>
                    </tr>
                </thead>
                <tbody>
                  {offers.length === 0 ? (
                      <tr>
                        <td colSpan="3" style={{ textAlign: 'center' }}>No offers</td>
                      </tr>
                    ) : (
                      offers.map((offer, index) => (
                        <tr key={index}>
                          <td>{offer.id}</td>
                          <td>{offer.description}</td>
                          <td>{offer.value}</td>
                        </tr>
                      ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default App;
