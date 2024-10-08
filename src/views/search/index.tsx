import { useEffect, useState } from "react";
import { ReviewCard } from "./components/ReviewCard";
import Masonry from "react-layout-masonry";
import { getRecommendReviews } from "../../helpers/hooks/api/api";
import { Review } from "../../model/review";

export function Search() {
  const [reviews, setReviews] = useState([] as Review[]);

  useEffect(() => {
    const getReviews = async () => {
      const fetchedReviews = await getRecommendReviews(); // Fetch reviews
      if (fetchedReviews) {
        setReviews(fetchedReviews); // Update state with fetched reviews
      }
    };

    getReviews(); // Call the function to fetch reviews when the component mounts
  }, []);

  return (
    <div>
      <Masonry
        columns={{ 300: 2, 640: 3, 768: 4, 1024: 5, 1280: 6 }}
        gap={2}
        columnProps={{ style: { marginTop: "2rem" } }}
      >
        {reviews.map((review) => (
          <ReviewCard review={review} />
        ))}
      </Masonry>
    </div>
  );
}
