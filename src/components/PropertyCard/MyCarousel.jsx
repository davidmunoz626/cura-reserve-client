import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import './MyCarousel.css'



function MyCarousel({ arrayOfImage }) {


    return (
        <Carousel>
            {arrayOfImage.map(element => {
                return (
                    <Carousel.Item key={element} >
                        <img
                            className="d-block w-100 myCarrousel"
                            src={element}
                            alt="Img slide"
                        />
                    </Carousel.Item>
                )
            })}
        </Carousel>
    )
}


export default MyCarousel;

