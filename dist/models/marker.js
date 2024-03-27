"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const markerSchema = new mongoose_1.default.Schema({
    position: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    text: {
        type: String,
        default: '',
        required: true
    },
});
const MarkerModel = mongoose_1.default.model('Marker', markerSchema);
exports.default = MarkerModel;
