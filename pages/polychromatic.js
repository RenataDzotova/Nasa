// import axios from "axios"
// import { useState, useEffect } from "react"
// import Image from "next/image";

// export default function Polychromatic(){

//     const [image, setImage] = useState([]);
//     const [images, setImages] = useState([]);
//     const [time, setTime] = useState("loading");
//     const [date, setDate] = useState('');
//     const [coords, setCoords] = useState({});

//     const apiKey = "HRhZabIEc8t1MbYzm8y0h91H5ecFOwMQrT4G8j25"
//     const url = `https://epic.gsfc.nasa.gov/api/natural?api_key=${apiKey}`

//     const getPolychromaticData = async()=>{
//         const res = await axios.get(url)
//         const data = await res.data;
//         console.log(data)

//         const caption = data[0].caption;
//         const date = data[0].date.split(" ")[0];
//         const date_formatted = date.replaceAll("-", "/")

//         let times=[];
//         let images = [];

//         for(let i = 0; i < data.length; i++){
//             let  time = data[i].date.split(" ")[1];
//             let coords = data[i].centroid_coordinates;
//             let imageGrabbed = data[i].image;
//             let image = `https://epic.gsfc.nasa.gov/archive/natural/${date_formatted}/png/${imageGrabbed}.png`;

//             times.push(time);
//             images.push({
//                 image: image,
//                 time: time,
//                 coords: coords
//             })
//         }

//         setDate(date);
//         setImages(images);

//         setImage(images[0].image);
//         setTime(times[0]);
//         setCoords([images[0].coords.lat, images[0].coords.lon]);

//         console.log(image)
//     }

//     useEffect(() => {
//         getPolychromaticData();
//     }, [])
    
//     return(
//         <>
//         Polychromatic
//         <Image src={image} alt={image} width={200} height={200} />
//         <div>{time}</div>
//         <div>{coords[0]}, {coords[1]}</div>

//         <table>
//             <thead>
//                 <tr>
//                     <th>Time</th>
//                     <th>Latitude</th>
//                     <th>Longtitude</th>
//                     <th>Image</th>
//                     <th></th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     images.map((e, i) => {
//                         return(
//                             <tr key={i}>
//                                 <td>{e.time}</td>
//                                 <td>{e.coords.lat}</td>
//                                 <td>{e.coords.lon}</td>
//                                 <td><Image src={e.image} alt={i} width={200} height={200}/></td>
//                                 <td>
//                                     <button onClick={() => {
//                                         setImage(e.image)
//                                         setTime(e.time)
//                                         setCoords([e.coords.lat, e.coords.lon]);
//                                         console.log(images[i].image);
//                                         document.body.scrollIntoView();
//                                     }}>View</button>
//                                 </td>
//                             </tr>
//                         )
//                     })
//                 }
//             </tbody>
//         </table>
//         </>
//     )
// }


import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
// import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";

export default function Polychromatic() {
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [time, setTime] = useState("loading");
  const [date, setDate] = useState("");
  const [coords, setCoords] = useState({});

  const apiKey = "HRhZabIEc8t1MbYzm8y0h91H5ecFOwMQrT4G8j25";
  const url = `https://epic.gsfc.nasa.gov/api/natural?api_key=${apiKey}`;

  const getPolychromaticData = async () => {
    const res = await axios.get(url);
    const data = await res.data;

    const caption = data[0].caption;
    const date = data[0].date.split(" ")[0];
    const date_formatted = date.replaceAll("-", "/");

    let times = [];
    let images = [];

    for (let i = 0; i < data.length; i++) {
      let time = data[i].date.split(" ")[1];
      let coords = data[i].centroid_coordinates;
      let imageGrabbed = data[i].image;
      let image = `https://epic.gsfc.nasa.gov/archive/natural/${date_formatted}/png/${imageGrabbed}.png`;

      times.push(time);
      images.push({
        image: image,
        time: time,
        coords: coords,
      });
    }

    setDate(date);
    setImages(images);

    setImage(images[0].image);
    setTime(times[0]);
    setCoords([images[0].coords.lat, images[0].coords.lon]);
  };

  useEffect(() => {
    getPolychromaticData();
  }, []);

  return (
    <div style={{ 
     padding: "50px",
     backgroundColor:"black", 
     backgroundImage:"url('/stars2.jpeg')", 
     backgroundRepeat:"repeat", 
     backgroundSize: "contain", 
    //  display:"flex", 
    //  flexDirection:"column", 
    //  justifyContent:"center", 
    //  alignItems:"center" 
     }}>
      <div style={{ 
     display:"flex", 
     flexDirection:"column", 
     justifyContent:"center", 
    //  alignItems:"center" 
     }}>
      <Typography variant="h4" gutterBottom style={{ color: "white", fontSize: "50px" }}>
        Polychromatic
      </Typography>
      <Image src={image} alt={image} width={200} height={200} />
      <div style={{ color: "white", fontSize: "35px", margin:"15px 0 15px 0" }}>Time: {time}</div>
      <div style={{ color: "white" }}>
        {coords[0]}, {coords[1]}
      </div>
      </div>

      <TableContainer component={Paper} style={{ marginTop: "24px", backgroundColor: "black" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white" }}>Time</TableCell>
              <TableCell style={{ color: "white" }}>Latitude</TableCell>
              <TableCell style={{ color: "white" }}>Longitude</TableCell>
              <TableCell style={{ color: "white" }}>Image</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {images.map((e, i) => {
              return (
                <TableRow key={i}>
                  <TableCell style={{ color: "white" }}>{e.time}</TableCell>
                  <TableCell style={{ color: "white" }}>{e.coords.lat}</TableCell>
                  <TableCell style={{ color: "white" }}>{e.coords.lon}</TableCell>
                  <TableCell>
                    <Image src={e.image} alt={i} width={200} height={200} />
                  </TableCell>
                  <TableCell>
                    <Button
                     style={{ backgroundColor: "#987d53", border: "2px solid white" }}
                      size="large"
                      variant="contained"
                      onClick={() => {
                        setImage(e.image);
                        setTime(e.time);
                        setCoords([e.coords.lat, e.coords.lon]);
                        document.body.scrollIntoView();
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}



