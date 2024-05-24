
import { useEffect, useState } from "react";


function DogPicture() {

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        fetch('https://dog.ceo/api/breeds/image/random')
        .then((res) => res.json())
        .then((data) => {
            setImageUrl(data.message);
        });
    }, []);

    return ( 
        <div>
            <img src={imageUrl} alt='a dog' style={{width: '100%', height: '100%'}} />
        </div>
     );
}

export default DogPicture;