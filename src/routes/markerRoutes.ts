import express from 'express';
import { addMarker, deleteMarker, getMarkers } from "../ctrls/markerController"
import MarkerModel from '../models/marker'; 
// import verifyToken from '../middleware/auth';

const router = express.Router();

router.post("/create", (req, res) => addMarker(MarkerModel, req, res));
router.get("/fetch",  (req, res) => getMarkers(MarkerModel, req, res));
router.delete("/delete/:id", (req, res) => deleteMarker(MarkerModel, req, res));

export default router;