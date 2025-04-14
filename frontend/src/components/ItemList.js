import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ItemForm from './ItemForm';
import './ItemList.css';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await api.getAllItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (itemData) => {
    try {
      await api.createItem(itemData);
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, itemData) => {
    try {
      await api.updateItem(id, itemData);
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteItem(id);
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      await api.updateItem(id, { completed: !completed });
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="item-list">
      <h1>Items</h1>
      <ItemForm 
        onSubmit={editingItem ? (data) => handleUpdate(editingItem._id, data) : handleCreate}
        initialData={editingItem}
        onCancel={() => setEditingItem(null)}
      />
      
      <div className="items-container">
        {items.map(item => (
          <div key={item._id} className="item-card">
            <div className="item-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="item-status">
                Status: {item.completed ? 'Completed' : 'Pending'}
              </div>
            </div>
            <div className="item-actions">
              <button 
                onClick={() => handleToggleComplete(item._id, item.completed)}
                className={`status-btn ${item.completed ? 'completed' : 'pending'}`}
              >
                {item.completed ? 'Mark Pending' : 'Mark Complete'}
              </button>
              <button 
                onClick={() => setEditingItem(item)}
                className="edit-btn"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(item._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
