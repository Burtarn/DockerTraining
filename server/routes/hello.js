import express from "express";
const router = express.Router();

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Returnerar ett meddelande
 *     responses:
 *       200:
 *         description: Ett JSON-meddelande
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hej från express-servern!
 */
router.get("/hello", (req, res) => {
  res.json({ message: "Hej från express-servern!" });
});

export default router;
