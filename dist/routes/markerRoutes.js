"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const markerController_1 = require("../ctrls/markerController");
const marker_1 = __importDefault(require("../models/marker"));
// import verifyToken from '../middleware/auth';
const router = express_1.default.Router();
router.post("/create", (req, res) => (0, markerController_1.addMarker)(marker_1.default, req, res));
router.get("/fetch", (req, res) => (0, markerController_1.getMarkers)(marker_1.default, req, res));
router.delete("/delete/:id", (req, res) => (0, markerController_1.deleteMarker)(marker_1.default, req, res));
router.put("/update/:id", (req, res) => (0, markerController_1.updateMarker)(marker_1.default, req, res));
exports.default = router;
