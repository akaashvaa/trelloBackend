import express from "express";
var router = express.Router();

router.get("/", function (req, res, next) {
  return res.status(200).json({
    type: "ok",
    message: "everything works fine",
  });
});
export default router;
