import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import './css/CCarousel.css'

export default function CCarousels() {
    return (
        <div className="CCarousel" style={{ marginTop: '5rem', marginBottom: '1rem'}}>
            <Carousel>
                <Carousel.Item interval={1500}>
                    <img
                    className="d-block w-100 CCarousel"
                    src="https://media.istockphoto.com/vectors/online-market-web-banner-hand-holding-smart-phone-ordering-products-vector-id938764940"
                    alt="Third slide"
                    /> 
                </Carousel.Item>
                <Carousel.Item interval={1500}>
                    <img
                    className="d-block w-100 CCarousel"
                    src="https://image.freepik.com/vector-gratis/banner-venta-lunes-cibernetico-fondo-abstracto-3d_1361-1916.jpg"
                    alt="First slide"
                    /> 
                </Carousel.Item>
                <Carousel.Item interval={1500}>
                    <img
                    className="d-block w-100 CCarousel"
                    src="https://img.freepik.com/vector-gratis/banner-moderno-venta-productos_1361-1341.jpg"
                    alt="Second slide"
                    /> 
                </Carousel.Item>

            </Carousel>
        </div>
    )
}
