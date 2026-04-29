import React, { useState, useEffect } from 'react';
import { useStoreUser } from '../stores/storeUser';
import '../styles/Admin.css';

// Configurazione tabelle allineata al backend
type TableKey = 'utenti' | 'voli' | 'tratte' | 'aeroporti' | 'aerei' | 'piloti' | 'ticket' | 'booking';

interface TableConfig {
    label: string;
    icon: string;
    endpoint: string;
}

const TABLE_MAP: Record<TableKey, TableConfig> = {
    utenti: { label: 'Utenti', icon: 'group', endpoint: '/api/amministrazione/user' },
    voli: { label: 'Voli', icon: 'flight_takeoff', endpoint: '/api/amministrazione/voli' },
    tratte: { label: 'Tratte', icon: 'map', endpoint: '/api/amministrazione/tratte' },
    aeroporti: { label: 'Aeroporti', icon: 'connecting_airports', endpoint: '/api/amministrazione/aeroporti' },
    aerei: { label: 'Aerei', icon: 'airplanemode_active', endpoint: '/api/amministrazione/aerei' },
    piloti: { label: 'Piloti', icon: 'person_pin', endpoint: '/api/amministrazione/piloti' },
    ticket: { label: 'Biglietti', icon: 'confirmation_number', endpoint: '/api/amministrazione/ticket' },
    booking: { label: 'Prenotazioni', icon: 'event_note', endpoint: '/api/amministrazione/booking' },
};

const TABLE_FIELDS: Record<TableKey, string[]> = {
    utenti: ['name', 'surname', 'email', 'password', 'admin'],
    voli: ['tratte_id', 'aerei_id', 'piloti_id', 'gate_id', 'data_partenza', 'orario_partenza', 'orario_arrivo'],
    tratte: ['aereoporto_partenza', 'aereoporto_arrivo', 'distanza', 'prezzo'],
    aeroporti: ['codice_IATA', 'name', 'city', 'country'],
    aerei: ['modello', 'capienza'],
    piloti: ['nome', 'cognome'],
    ticket: ['prenotazione_id', 'volo_id', 'prezzo', 'classe'],
    booking: ['user_id'],
};

const Admin: React.FC = () => {
    const { userAuth, logged, isAdmin } = useStoreUser();
    const [activeTable, setActiveTable] = useState<TableKey>('utenti');
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Stati per la modale
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<any>(null);
    const [formData, setFormData] = useState<Record<string, any>>({});

    const fetchData = async () => {
        if (!userAuth || loading) return;
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(TABLE_MAP[activeTable].endpoint, {
                headers: { 
                    'Authorization': `Basic ${userAuth}`,
                    'Accept': 'application/json'
                }
            });
            
            const contentType = response.headers.get("content-type");
            if (!response.ok) {
                let errorMessage = `Errore HTTP: ${response.status}`;
                if (contentType && contentType.includes("application/json")) {
                    const errData = await response.json();
                    errorMessage = errData.error || errorMessage;
                }
                throw new Error(errorMessage);
            }
            
            if (contentType && contentType.includes("application/json")) {
                const result = await response.json();
                const rows = Array.isArray(result) ? result : (result.data && Array.isArray(result.data)) ? result.data : [result];
                setData(rows);
            }
        } catch (err: any) {
            setError(err.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (logged && isAdmin) {
            fetchData();
        }
    }, [activeTable, userAuth, logged, isAdmin]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const isEdit = editingId !== null;
        const method = isEdit ? 'PATCH' : 'POST';
        const url = isEdit ? `${TABLE_MAP[activeTable].endpoint}/${editingId}` : TABLE_MAP[activeTable].endpoint;

        console.log(`[ADMIN SAVE] Mode: ${isEdit ? 'EDIT' : 'CREATE'}, Method: ${method}, URL: ${url}`);

        // Pulizia dati: inviamo solo i campi previsti per la tabella
        const payload: Record<string, any> = {};
        TABLE_FIELDS[activeTable].forEach(field => {
            if (formData[field] !== undefined) {
                payload[field] = formData[field];
            }
        });

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 
                    'Authorization': `Basic ${userAuth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                await fetchData();
                setShowModal(false);
                setFormData({});
                setEditingId(null);
            } else {
                const contentType = response.headers.get("content-type");
                let errorMsg = "Errore durante il salvataggio";
                if (contentType && contentType.includes("application/json")) {
                    const err = await response.json();
                    errorMsg = err.error || errorMsg;
                }
                alert(`Errore: ${errorMsg}`);
            }
        } catch (err) {
            alert("Errore di connessione durante il salvataggio");
        }
    };

    const handleEdit = (row: any) => {
        const id = row.id || row.codice_IATA || row.ticket_id || row.aerei_id;
        setEditingId(id);
        setFormData(row);
        setShowModal(true);
    };

    const handleDelete = async (id: any) => {
        if (!window.confirm("Sei sicuro di voler eliminare questo record definitivamente?")) return;
        
        try {
            const response = await fetch(`${TABLE_MAP[activeTable].endpoint}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Basic ${userAuth}` }
            });
            
            if (response.ok) {
                setData(data.filter(item => (item.id || item.codice_IATA || item.ticket_id || item.aerei_id) !== id));
            } else {
                const err = await response.json();
                alert(`Errore: ${err.error}`);
            }
        } catch (err) {
            alert("Errore di connessione durante l'eliminazione");
        }
    };

    const openCreateModal = () => {
        setEditingId(null);
        setFormData({});
        setShowModal(true);
    };

    if (!logged || !isAdmin) {
        return (
            <div className="admin-page" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div className="admin-stat-card" style={{ textAlign: 'center', padding: '40px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '64px', color: '#b41340' }}>lock</span>
                    <h2>Accesso Negato</h2>
                    <p>Non hai i permessi necessari.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <aside className="admin-sidebar">
                <div className="admin-logo-section">
                    <div className="admin-avatar">G</div>
                    <div>
                        <p style={{ fontWeight: '800' }}>Admin Ghoan</p>
                        <p style={{ fontSize: '10px', color: '#acadad' }}>Database Master</p>
                    </div>
                </div>

                <nav className="admin-nav">
                    {(Object.keys(TABLE_MAP) as TableKey[]).map((key) => (
                        <button
                            key={key}
                            onClick={() => setActiveTable(key)}
                            className={`admin-nav-item ${activeTable === key ? 'active' : ''}`}
                        >
                            <span className="material-symbols-outlined">{TABLE_MAP[key].icon}</span>
                            {TABLE_MAP[key].label}
                        </button>
                    ))}
                </nav>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <span className="admin-badge">Gestione {TABLE_MAP[activeTable].label}</span>
                        <h1 className="admin-title">Pannello di Controllo</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn-edit" onClick={fetchData} style={{ padding: '12px 20px', borderRadius: '12px', cursor: 'pointer' }}>
                            <span className="material-symbols-outlined">refresh</span>
                        </button>
                        <button 
                            onClick={openCreateModal}
                            style={{ background: '#8137b1', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="material-symbols-outlined">add</span> Nuovo Record
                        </button>
                    </div>
                </header>

                <div className="admin-stats-grid">
                    <div className="admin-stat-card">
                        <p className="admin-form-label">Elementi</p>
                        <p style={{ fontSize: '32px', fontWeight: '900' }}>{data.length}</p>
                    </div>
                    <div className="admin-stat-card primary">
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', fontWeight: '800' }}>Stato</p>
                        <p style={{ fontSize: '32px', fontWeight: '900' }}>Live</p>
                    </div>
                </div>

                <div className="admin-table-container">
                    {loading ? (
                        <div style={{ padding: '80px', textAlign: 'center' }}>Caricamento...</div>
                    ) : error ? (
                        <div style={{ padding: '80px', textAlign: 'center', color: '#b41340' }}>{error}</div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    {data.length > 0 && Object.keys(data[0]).map(key => <th key={key}>{key}</th>)}
                                    <th style={{ textAlign: 'right' }}>Azioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, idx) => (
                                    <tr key={idx}>
                                        {Object.values(row).map((val: any, i) => (
                                            <td key={i}>{String(val)}</td>
                                        ))}
                                        <td style={{ textAlign: 'right' }}>
                                            <button className="btn-edit" onClick={() => handleEdit(row)}>
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>
                                            <button 
                                                className="btn-delete"
                                                onClick={() => handleDelete(row.id || row.codice_IATA || row.ticket_id || row.aerei_id)}
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>

            {showModal && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h2 className="admin-modal-title">{editingId ? 'Modifica' : 'Nuovo'} Record</h2>
                            <p style={{ color: '#acadad', fontSize: '12px' }}>Stai agendo sulla tabella {activeTable}</p>
                        </div>
                        <form onSubmit={handleSave} className="admin-form-grid">
                            {TABLE_FIELDS[activeTable].map(field => (
                                <div key={field} className="admin-form-group">
                                    <label className="admin-form-label">{field}</label>
                                    <input 
                                        className="admin-form-input"
                                        value={formData[field] || ''}
                                        placeholder={`Inserisci ${field}...`}
                                        onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                                        required={!editingId}
                                    />
                                </div>
                            ))}
                            <div className="admin-modal-actions">
                                <button type="button" onClick={() => setShowModal(false)} className="admin-nav-item">Annulla</button>
                                <button type="submit" className="admin-stat-card primary" style={{ padding: '12px 24px', cursor: 'pointer', border: 'none' }}>
                                    {editingId ? 'Aggiorna Record' : 'Crea Record'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
