// formData sate has 4 parts rememeber one ---
//  (1)image downlaod url i.e basically we store the image in the firebase and it gives us a downloadable URL which we store in formdata which is stored in mongodb database  (2). tile (3).category (4).content
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState(null); // store the file from the device
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();
   
  // **** Image uploading function from device  and storing converting it into a URL kind a thingy which is saved inside the 'formData'*****

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image'); // when admin didnt select any image
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);// create a storage instance in 'app' from '../firebase' basically the firebase.js file which connects with the firebase 
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);// kinda of a pointer which points towards the memory location in firebase where the image will be stored 
      const uploadTask = uploadBytesResumable(storageRef, file); // uploads the file from your device to the fire base
      
      uploadTask.on(
        
        //This line sets up an event listener for changes in the state of the upload task. It listens for events such as progress updates, errors, and completion of the upload task.
        'state_changed',
        
        //This function is called when there is a progress update during the upload. It calculates the upload progress as a percentage and updates the state variable imageUploadProgress accordingly.
      //  [ FROM DEVICE OF ADMIN---->> FIRE-BASE]
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
       //This function is called if there is an error during the upload process.
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        //This function is called when the upload task is completed successfully. It retrieves the download URL of the uploaded image using getDownloadURL with the reference to the uploaded file (uploadTask.snapshot.ref). Once the download URL is obtained, it updates the state variables to reflect the successful upload and sets the download URL in the form data.  
        //Completion: Once the upload is completed successfully, it retrieves the download URL of the uploaded image using getDownloadURL with the reference to the uploaded file. This URL represents the location of the uploaded image in Firebase Storage.
        () => {
          // now getDownloadURL () point toward the storage where our data is image is stored 
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL }); //The download URL is then used to update the form data state (formData) with the URL of the uploaded image.[FROM FIREBASE to formdata state as a url ]
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();// stops from submitting empty form 
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // 4 things in form data (1)image downlaod url (2). tile (3).category (4).content
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
