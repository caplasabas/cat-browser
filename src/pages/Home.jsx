import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import { 
    Col,
    Row,
    Button,
    Dropdown,
    DropdownButton,
    Card
} from 'react-bootstrap';

import Api from '../services/axios';

import { connect } from "react-redux";
import { setBreed } from "../store/actions";

const Home = (props) => {
    const {
        breed,
        setBreed
    } = props;

    const [loading, setLoading] = useState(false);
    const [breeds, setBreeds] = useState([])
    const [images, setImages] = useState([])
    const [imagePage, setImagePage] = useState(0);
    const [hasMoreImages, setHasMoreImages] = useState(true)
    
   
    useEffect(() => {
        Api().get('breeds').then((result) => {
            setBreeds(result.data)
        }).catch(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (breed) {
            setLoading(true);
            setImages([]);
            setImagePage(1);
            setHasMoreImages(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [breed])

    useEffect(() => {
       if (imagePage > 0) {
        Api().get(`images/search?breed_id=${breed.id}&limit=${10}&page=${imagePage}`).then((result) => {
            setHasMoreImages((images.length + result.data.length) < parseInt(result.headers['pagination-count']))

            if (imagePage === 1) {
                setImages(result.data)
            } else {
                setImages([...images, ...result.data])
            }

            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
       }
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imagePage, breed])

    const getMoreImages = () => {
        setLoading(true);
        setImagePage(imagePage+1);
    }

    const _onBreedClick = (breed) => {
        setBreed(breed)
    }

    return (
        <div>
            <h1 className="title my">Cat Browser</h1>
            { breed ?
                    <p>{breed.name}</p>
                :
                    <p>Breed</p>
            }
      
            <DropdownButton id="dropdown-basic-button" variant="outline-secondary" className="dropdownButton my" title={breed ? breed.name : 'Select Breed'}>
                { breeds.map((b, i) => (
                    <Dropdown.Item key={i} onClick={() => _onBreedClick(b)} >{b.name}</Dropdown.Item>
                ))}
            </DropdownButton>

            <Row>
                { images.map((image, i) => (
                    <Col xs={6} md={3} key={i}>
                        <Card>
                            <Card.Img variant="top" src={image.url} />
                            <Card.Body className="text-center">
                                <Button variant="primary">
                                    <Link to={`/image/${image.id}`} style={{color: 'white'}}>View Details</Link>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>     
                ))}
            </Row>
            { breed && hasMoreImages &&
                <Button className="my" variant="success" onClick={getMoreImages} disabled={loading}>
                    {   loading ?
                            <div> Loading...</div>
                        :
                            <div> Load More</div>
                    }
                </Button>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    const breed = state.breed;
    return { breed };
};

export default connect(mapStateToProps, { setBreed })(Home);