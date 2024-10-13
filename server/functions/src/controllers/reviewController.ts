import { Request, Response } from "express";
import {
  getAllReviews,
  getReviewById,
  addReview,
  getReviewsByAuthor,
  searchReviews,
  fetchReviewsWithPagination,
  deleteReview,
} from "../services/dynamoService";

export const getAllReviewsHandler = async (req: Request, res: Response) => {
  try {
    const orders = await getAllReviews();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve orders" });
  }
};

export const fetchReviewsHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { limit = 10, lastEvaluatedKey } = req.query;
  try {
    const result = await fetchReviewsWithPagination(
      Number(limit),
      lastEvaluatedKey
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reviews" });
  }
};

export const deleteReviewHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "Review id is required" });
  }

  try {
    const result = await deleteReview(Number(id));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: `Error deleting review with id ${id}` });
  }
};

export const getReviewByIdHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "reviewId is required in the request body" });
  }

  try {
    const review = await getReviewById(Number(id));
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reviews by review Id" });
  }
};

export const addReviewHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { imageUrl, author, title, content, rate } = req.body;

  if (!author || !title || !content || !rate) {
    res
      .status(400)
      .json({ error: "author, title, content, and rate are required" });
  }

  try {
    const result = await addReview({ imageUrl, author, title, content, rate });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error adding review" });
  }
};

export const getReviewsByAuthorHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { author, reviewId } = req.body;

  if (!author) {
    res.status(400).json({ error: "Author is required in the request body" });
  }

  try {
    const reviews = await getReviewsByAuthor(
      author,
      reviewId ? Number(reviewId) : undefined
    );
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reviews by author" });
  }
};

export const searchReviewsHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { query } = req.body;

  if (!query) {
    res.status(400).json({ error: "Query string is required" });
  }

  try {
    const reviews = await searchReviews(query);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error searching reviews" });
  }
};

export const uploadImageHandler = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).send({
    message: "Image uploaded successfully!",
    imageUrl: (req.file as any).location, // S3 image URL
  });
};
