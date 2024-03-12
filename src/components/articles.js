import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Link,
  Skeleton,
  Button,
} from "@mui/material";

// Separate component for an Article Card
const ArticleCard = ({ urlToImage, image_url, title, description, url }) => (
  <Card
    sx={{
      maxWidth: "100%",
      transition: "transform 0.3s ease-in-out",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(1.03)",
      },
    }}
  >
    <CardMedia
      component="img"
      height="140"
      image={urlToImage || image_url}
      alt={title || "Image unavailable"}
    />
    <CardContent>
      {title !== "[Removed]" && (
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      )}
      {description !== "[Removed]" && (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      )}
      {url && (
        <Button
          component={Link}
          href={url}
          target="_blank"
          rel="noopener"
          sx={{
            marginTop: "8px",
            backgroundColor: "#09c !important",
            color: "#f1f1f1 !important",
            width: "120px",
          }}
        >
          Read More
        </Button>
      )}
    </CardContent>
  </Card>
);

// Loading skeleton for an Article Card
const LoadingCard = () => (
  <Card sx={{ maxWidth: "100%" }}>
    <Skeleton variant="rectangular" height={140} animation="wave" />
    <CardContent>
      <Skeleton variant="text" animation="wave" />
      <Skeleton variant="text" animation="wave" />
      <Skeleton variant="text" animation="wave" width="60%" />
    </CardContent>
  </Card>
);

const ArticlesGrid = ({ articles, loading }) => {
  return (
    <Grid container spacing={4} className="px-4">
      {loading
        ? Array.from(new Array(8)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <LoadingCard />
            </Grid>
          ))
        : articles.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={article.id || index}>
              <ArticleCard {...article} />
            </Grid>
          ))}
    </Grid>
  );
};

export default ArticlesGrid;
