"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMarker = exports.deleteMarker = exports.addMarker = exports.getMarkers = void 0;
function getMarkers(Marker, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const markers = yield Marker.find({});
            res.json(markers);
        }
        catch (error) {
            console.error("Error retrieving markers:", error.message);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    });
}
exports.getMarkers = getMarkers;
function addMarker(Marker, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { position, text } = req.body;
            const newMarker = new Marker({
                position,
                text,
            });
            yield newMarker.save();
            res.status(201).json(newMarker);
        }
        catch (error) {
            console.error("Error adding marker:", error.message);
            res.status(400).json({ message: "Error adding marker", error: error.message });
        }
    });
}
exports.addMarker = addMarker;
function deleteMarker(Marker, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const result = yield Marker.findByIdAndDelete(id);
            if (result) {
                res.status(200).json({ message: 'Marker deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'Marker not found' });
            }
        }
        catch (error) {
            console.error("Error deleting marker:", error.message);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    });
}
exports.deleteMarker = deleteMarker;
const updateMarker = (Marker, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { position, text } = req.body;
    try {
        const updatedMarker = yield Marker.findByIdAndUpdate(id, { position, text }, { new: true });
        if (updatedMarker) {
            res.json(updatedMarker);
        }
        else {
            res.status(404).json({ message: 'Marker not found' });
        }
    }
    catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (typeof error === 'object' && error !== null && 'message' in error) {
            errorMessage = error.message;
        }
        console.error("Error updating marker:", errorMessage);
        res.status(500).json({ message: 'Internal Server Error', error: errorMessage });
    }
});
exports.updateMarker = updateMarker;
