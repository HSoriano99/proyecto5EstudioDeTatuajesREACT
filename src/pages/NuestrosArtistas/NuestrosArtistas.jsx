import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getArtists } from "../../services/ApiCalls";
import { userData } from "../userSlice";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./NuestrosArtistas.css"


export const NuestrosArtistas = () =>{
    const navigate = useNavigate();
    const userRdxData = useSelector(userData);
    const [Artists, setArtists] = useState([]);

    const token = userRdxData.credentials.token;
    const id = userRdxData.credentials.userData?.userId;
    const decoded = userRdxData.credentials?.userData;

    useEffect(() => {
        getArtists().then((res) => {
            setArtists(res)
        })
      }, []);

    useEffect(() => {

        console.log( "Soy mis artistas ", Artists )
    },[Artists]);


    return (
        <div className="artistPage">
            <div className="pageTitle">
                <h1>ESTOS SON NUESTROS ARTISTAS</h1>
            </div>
            <div className="artistDiv">
                 {Artists.map((artist, i)=>{
                    return (
                        <Card className="artistcard" key={i} >
                            <Card.Img className="artistimg" variant="top" src={Artists[i]?.profile_image} />
                            <Card.Body>
                                <Card.Title>{Artists[i]?.first_name}</Card.Title>
                                <Card.Text>{Artists[i]?.last_name}</Card.Text>
                                <Card.Text>{Artists[i]?.phone_number}</Card.Text>
                                <Card.Text>{Artists[i]?.tattoo_style}</Card.Text>
                                <Button variant="dark">Go somewhere</Button>
                            </Card.Body>
                         </Card>
                        )
                    })}
            </div>
        
        </div>
    )
}