import Carousel from 'react-bootstrap/Carousel';
import AutoComplete from '../../components/SeachBar/SearchBar';
import './HomePage.css'
import Header from '../../components/Header/Header';
import video from '../../asssets/homePageVideo.mp4'
import Loader from '../../components/Loader/Loader';
const HomePage = () => {
    return (
        <>
            <Header />
            {!video ? <Loader /> :
                <video className='homeVideo' src="https://res.cloudinary.com/devlxmp7l/video/upload/v1670700657/video_ynp7ld.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                ></video>
            }


        </>
    )
}
export default HomePage