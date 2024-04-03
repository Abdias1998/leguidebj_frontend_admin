import Head from "next/head";
import { useRouter } from "next/router";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Unstable_Grid2 as Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { getDateInscription, requete } from "src/env/requete";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import EmailIcon from "@mui/icons-material/Email"; // Icone pour l'email
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Icone pour la localisation
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Icone pour le nom
import EventNoteIcon from "@mui/icons-material/EventNote"; // Icone pour "Membre depuis"
import PhoneIcon from "@mui/icons-material/Phone"; // Icone pour le numéro de téléphone
import RoomIcon from "@mui/icons-material/Room"; // Icone pour le pays
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Icone pour l'état "Actif"
import BlockIcon from "@mui/icons-material/Block"; // Icone pour l'état "Désactivé"

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const { slug } = router.query;
  const imagesWithoutFirst = data?.document?.slice(1);

  useEffect(() => {
    const getDetailGuide = async (slug) => {
      const res = await axios.get(`${requete.admin}/get_info_guide/${slug}`);
      setData(res.data);
    };

    getDetailGuide(slug);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard | LE GUIDE BJ</title>
      </Head>

      <Card variant="outlined">
        <IconButton aria-label="retour" style={{ marginBottom: 10 }}>
          <Link href={`/admin/guides`} style={{ textDecoration: "none" }}>
            <ArrowBackIcon />
          </Link>
        </IconButton>
        <CardContent>
          <Image
            style={{ borderRadius: "100%" }}
            src={data?.document[0]}
            decoding="async"
            loading="lazy"
            data-nimg="1"
            alt="Picture of the author"
            width={50}
            height={50}
          />
          <Typography variant="h2" component="div">
            <AccountCircleIcon /> {data?.names} {/* Remplacement du texte par l'icône pour le nom */}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            <EventNoteIcon /> Membre depuis: {`${getDateInscription(data?.createdAt)}`} {/* Remplacement du texte par l'icône pour la date */}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            <PhoneIcon /> Numéro: {data?.code} {data?.tel} {/* Remplacement du texte par l'icône pour le numéro de téléphone */}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            <RoomIcon /> Pays: {data?.country} {/* Remplacement du texte par l'icône pour le pays */}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            <CheckCircleIcon /> Disponibilté: {data?.available} {/* Remplacement du texte par l'icône pour la disponibilité */}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            <CheckCircleIcon /> Experience: {data?.experience} {/* Remplacement du texte par l'icône pour l'expérience */}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {data?.is_active ? <CheckCircleIcon /> : <BlockIcon />} Etat: {data?.is_active ? "Activer" : "Desativer"} {/* Remplacement du texte par l'icône pour l'état */}
          </Typography>

          <Typography variant="body2" component="p">
            {data?.count}
          </Typography>
          <Typography variant="body2" component="p">
            {data?.description}
          </Typography>
        </CardContent>
      </Card>

      <Carousel interval={2000} stopOnHover={true} autoPlay={true} showArrows={true} showThumbs={false} centerMode={true}>
        {imagesWithoutFirst?.map((image, index) => (
          <div key={index}>
            <Image src={image} width={600} height={400} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
