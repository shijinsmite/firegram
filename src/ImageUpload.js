import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { db, storage } from './Firebase';
import firebase from 'firebase';
import './ImageUpload.css';

const ImageUpload = ({ username }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    //storing image in firebase images folder storage
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    //since uploading file is async
    //listener will listen state_changed of image upload wr we can use this to write progress logic
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption('');
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100"></progress>
      <input
        type="text"
        placeholder="Enter a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <Button className="imageupload__button" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default ImageUpload;
