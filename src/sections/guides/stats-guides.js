import { TablePagination } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { requete } from 'src/env/requete';
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
 
  TableBody,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Button,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Scrollbar } from 'src/components/scrollbar';
import Image from 'next/image';
import Link from 'next/link';
const GuidesPage = () => {
  const [data,setData] = useState([])
  useEffect(() => {
    const getDetailGuide = async () => {
      const res = await axios.get(`${requete.admin}/get_max_increment_guides`);
     console.log(res.data.guides); 
     setData(res.data.guides) 
    };

    getDetailGuide();
  }, []);
  return (
    <div>
      <h1>Top 5 des guides</h1>
        <Scrollbar>
          <Card style={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
              
                <TableCell>Profil</TableCell>
                <TableCell>names</TableCell>
                  <TableCell>Email</TableCell>
              
                
          

                  <TableCell>Code</TableCell>
                  <TableCell>Nombre de visite</TableCell>
                
                </TableRow>
              </TableHead>
              <TableBody>
                {data ? 
                
                data?.map((item) => (
                  <TableRow style={{background:item.is_active !== true ? "gray": "green"}} key={item._id}>
              
          
          <TableCell>{ <Image style={{borderRadius:"100%"}} 
        src={item.document[0]} decoding="async" loading="lazy" data-nimg="1"
        alt="Picture of the author"
        width={50} 
        height={50} 
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />}</TableCell>
      
              <TableCell> <Link style={{textDecoration:'none'}} href={`guides/${item._id}`}> {item.names}</Link></TableCell>
                    <TableCell>{item.email}</TableCell>
                
                  
    
            
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.count}</TableCell>
                  
                    
                  </TableRow>
                )) :    <CircularProgress sx={{ mt: 3 }} color="secondary" />}
              </TableBody>
            </Table>
          
          </Card>
        </Scrollbar>
    </div>
  );
};

// export async function getStaticProps() {
//   try {
//     const response = await axios.get(`${requete.admin}/get_max_increment_guides`);
//     const guides = response.data;

//     // Trier les guides par count dans l'ordre décroissant
//     guides.sort((a, b) => b.count - a.count);
// console.log(guides);
//     // Prendre les 5 premiers guides
//     const topGuides = guides.slice(0, 5);

//     return { 
//       props: {
//         topGuides,
//       },
//     };
//   } catch (error) {
//     console.error('Erreur lors de la récupération des guides :', error);
//     return {
//       props: {
//         topGuides: [],
//       },
//     };
//   }
// }

export default GuidesPage;
