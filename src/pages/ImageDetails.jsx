import React , { useState, useEffect } from 'react';

import { 
    Button,
    Card
} from 'react-bootstrap';

import Api from '../services/axios';

const ImageDetails = ({match, history}) => {
    const { id } = match.params;

    const [image, setImage] = useState(null);
    
    useEffect(() => {
        Api().get(`images/${id}`).then((result) => {
            setImage(result.data)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Card>
            <Card.Header>
                <Button variant="primary" onClick={() => history.goBack()}>Back</Button>
            </Card.Header>
            { image &&
                <div>
                    <Card.Img variant="top" src={image.url}/>
                    <Card.Body>
                        <Card.Title>{image.breeds[0].name}</Card.Title>
                        <Card.Title>{`Origin: ${image.breeds[0].origin}`}</Card.Title>
                        <Card.Title>{image.breeds[0].temperament}</Card.Title>
                        <Card.Text>{image.breeds[0].description}</Card.Text>
                    </Card.Body>
                </div>
            }
        </Card>
    )
}

export default ImageDetails