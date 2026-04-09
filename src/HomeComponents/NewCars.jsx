import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Button,
} from "@mui/material";

export default function NewCars() {
  /* مصفوفة بيانات الأخبار */
  const newsData = [
    {
      /* Mercedes-Benz unveils the updated S-Class */
      id: 1,
      title: "Mercedes-Benz unveils the updated S-Class W223",
      description:
        "Modern luxury, sleek design, smart technology, innovative LED lighting, advanced safty.",
      image:
        "https://motofilm.pl/wp-content/uploads/2020/09/2021-mercedes-benz-s-class-front.jpg",
    },
    {
      /* BMW announces the new series 3 */
      id: 2,
      title: "BMW announces the new series 3 2026",
      description:
        "BMW has announced the new series 3, featuring a sporty design, advanced technology, and excellent performance. The new series 3 offers a dynamic driving experience with a range of efficient engines and cutting-edge safety features.",
      image:
        "https://cdn.motor1.com/images/mgl/0x0/3VZlqO/bmw-series-3-2024.jpg",
    },
    {
      /* Audi Q3  */
      id: 3,
      title: "Audi Q3 2026",
      description:
        "Audi has unveiled the new Q3, featuring a modern design, advanced technology, and excellent performance. The new Q3 offers a comfortable driving experience with a range of efficient engines and cutting-edge safety features.",
      image: "https://cdn.motor1.com/images/mgl/0x0/3VZlqO/audi-q3-2024.jpg",
    },
    {
      id: 4,
      title: "Porshe 911 2026",
      description:
        "Porshe has unveiled the new 911, featuring a sporty design, advanced technology, and excellent performance. The new 911 offers a dynamic driving experience with a range of efficient engines and cutting-edge safety features.",
      image:
        "https://cdn.motor1.com/images/mgl/0x0/3VZlqO/porsche-911-2024.jpg",
    },
  ];

  return (
    <Container sx={{ my: 20 }}>
      {/* بطاقة اخبار كبيرة وتحتها 3 بطاقات اخبار صغيرة بجانب بعضها */}
      <Card
        sx={{
          height: "85vh",

          mb: 4,
        }}
      >
        <CardMedia
          component="img"
          height="100%"
          image={newsData[0].image}
          alt="News Image"
        />
        <CardContent sx={{ position: "absolute", bottom: 0 }}>
          <Typography gutterBottom variant="h2" component="div">
            {newsData[0].title}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {newsData[0].description}
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        {newsData.slice(1).map((item) => (
          <Card key={item.id} sx={{ width: "33%" }}>
            <CardMedia
              component="img"
              height="140"
              image={item.image}
              alt="News Image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
