import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import './Home.css'
import image1 from '../../assets/alumni.jpg'
import image2 from '../../assets/alumni2.jpg'
import image3 from '../../assets/alumni3.png'

function Slides() {
    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '90vh',
      }
    const fadeImages = [{ name: image1 }, { name: image2 }, { name: image3 }];
    console.log(fadeImages)
    return (
        <div className="slide-container">
            <Slide>
                {fadeImages.map((slideImage, index) => (
                    <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.name})` }}>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    )
}

export default Slides;
