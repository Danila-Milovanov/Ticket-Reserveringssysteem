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
    
}