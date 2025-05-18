
const Support = () => {
return (
    <div className="support-page">
    <header>
        <div className="wrapper">
            <h1 className="flag">Supporta l'Autore</h1>
        </div>
        <p>Se apprezzi il lavoro di questo scrittore emergente, puoi contribuire tramite bonifico bancario.</p>
    </header>
    <main>
        <section className="donation" style={{ padding: "10px", margin: "20px" }}>
            <h2>Dettagli per la donazione</h2>
            <p>Effettua un bonifico bancario con le seguenti informazioni:</p>
            <ul >
            <li><strong>Intestatario:</strong> Nome Autore</li>
            <li><strong>IBAN:</strong> IT00X 00 00000 00000 00000 00000</li>
            <li><strong>Banca:</strong> Nome Banca</li>
            <li><strong>Causale:</strong> Supporto al Progetto</li>
            </ul>
        </section>
        <section>
        <p>Ricorda di rimanere aggiornato sui nuovi titoli, e grazie in anticipo per il tuo interesse!</p>
        <p>Ogni contributo aiuta a far crescere nuove storie e contenuti.</p>
        </section>
    </main>
    </div>
    );
};

export default Support;
