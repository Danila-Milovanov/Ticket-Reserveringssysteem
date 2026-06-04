import React, { useState } from 'react';

const AdminPanel = ({ events, onAddEvent, onUpdateEvent, onDeleteEvent }) => {
    // unified state for form fields
    const [formData, setFormData] = useState ({
        title: '',
        date: '',
        location: '',
        price: '',
        availableTickets: '',
    });

    const [ editingId, setEditingId ] = useState(null); // track which event is editing

    const [ error, setError ] = useState(''); 
    // handle inputs change dinamically
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    // submit handler for both add and update
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');


        if (!formData.title || !formData.date || !formData.location || !formData.price || !formData.availableTickets) {
            setError('Vul alle velden in.');
            return;
        }
    
        const eventData = {
            title: formData.title,
            date: formData.date,
            location: formData.location,
            price: parseFloat(formData.price),
            availableTickets: parseInt(formData.availableTickets, 10)
        };

        if (editingId) {

            // update existing event
            onUpdateEvent(editingId, eventData);
            setEditingId(null);
        } else {
            // add new event
            onAddEvent(eventPayload);
        }

        // reset form
        setformData({ title: '', date: '', location: '', price: '', availableTickets: '' });
    };


    const startEdit = (event) => {
        setEditingId(event.id);
        setFormData({
            title: event.title,
            date: event.date,
            location: event.location,
            price: event.price.toString(),
            availableTickets: event.availableTickets.toString(),
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({ title: '', date: '', location: '', price: '', availableTickets: '' });
        setError('');
    };

    return (
        <div className="admin-container">
            <h3>Organisator Beheerpanel (CRUD) </h3>

            {/* dynamic form for add/edit */}
            <h4>{editingId ? 'Event Aanpassen' : 'Nieuw Evenement Toevoegen'}</h4>

            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit} className="admin-form">
                <input type='text' name='title' placeholder='Titel' value={formData.title} onChange={handleInputChange} />
                <input type='date' name='date' placeholder='Datum' value={formData.date} onChange={handleInputChange} />
                <input type='text' name='location' placeholder='Locatie' value={formData.location} onChange={handleInputChange} />
                <input type='number' name='price' placeholder='Prijs' step="0.01" value={formData.price} onChange={handleInputChange} />
                <input type='number' name='availableTickets' placeholder='Beschikbare Tickets' value={formData.availableTickets} onChange={handleInputChange} />

                <div className="form-buttons">
                    <button type='submit' className='save-btn'>{editingId ? 'Opslaan' : 'Toevoegen'}</button>
                    {editingId && <button type='button' className='cancel-btn' onClick={cancelEdit}>Annuleren</button>}
                </div>
            </form>
            

        </div>
    )
}