import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageUploader.css';

const ImageUploader = () => {
    const [image, setImage] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!image) return alert("Please select an image.");

        const formData = new FormData();
        formData.append("image", image);
        setUploading(true);

        try {
            await axios.post("http://localhost:5001/api/images", formData);
            setImage(null);
            fetchGallery();
        } catch (err) {
            console.error("Upload error", err);
        } finally {
            setUploading(false);
        }
    };

    const fetchGallery = async () => {
        const res = await axios.get("http://localhost:5001/api/images");
        setGallery(res.data);
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    return (
        <div className="uploader-container">
            <h1>📷 Image Upload</h1>

            <div className="upload-box">
                <input type="file" onChange={handleImageChange} />
                <button onClick={handleUpload} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
            </div>

            <h2>Gallery</h2>
            <div className="gallery">
                {gallery.length === 0 && <p>No images uploaded yet.</p>}
                {gallery.map((img) => (
                    <img key={img.id} src={img.url} alt="uploaded" className="gallery-img" />
                ))}
            </div>
        </div>
    );
};

export default ImageUploader;
