import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

//when page loads load all the breeds of dogs
//display that list of dogs
//when a item is clicked load a random image of that type

function App() {
  const [dogImage, setDogImage] = useState(null);
  const [dogImages, setDogImages] = useState([]);
  const [dogBreed, setDogBreed] = useState([]);

  //When a user first hits my sight load the list of dog breeds
  useEffect(() =>{
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(res => res.json())
      .then(res => setDogBreed(Object.keys(res.message)));
  }, []);

  //have a button that runs code when clicked 
  const onDogClick = () => {
    //fetch a random dog photo
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(res => res.json())
      .then(res => setDogImage(res.message));
  }

  const fetchThreeDogPhotos = () => {
    fetch('https://dog.ceo/api/breeds/image/random/3')
      .then(res => res.json())
      .then(res => {
        setDogImages(res.message);
      });
}

const fetchDogBreed = breed => {
  fetch(`https://dog.ceo/api/breed/${breed}/images`)
  .then(res => res.json())
  .then(res => { 
    setDogImage(res.message[0]);
  });

}

//display a random dog photo
return (
  <div className="App">
      <h1>Click this button for my dogs</h1>
      <button onClick={onDogClick}>Dogs</button>
      {dogImage && <div>
      <h1>"Where my Dogs at?" Right here dog.</h1>
      <img src={dogImage} alt='random dog' />
      </div>}
      {dogImages.map((url, i) => <img key={i} src={url} alt='random dog'/>)}
      <button onClick={fetchThreeDogPhotos}>Fetch 3 dogs</button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {dogBreed.map(breed => <button onClick={()=>fetchDogBreed(breed)} key={breed}>{breed}</button>)}  
      <h1>DMX would be proud!</h1>
    </div>
  );
}
      
export default App;
