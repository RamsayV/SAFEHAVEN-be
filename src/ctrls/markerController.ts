import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { IMarker } from '../models/marker';





export async function getMarkers(Marker: Model<IMarker>, req: Request, res: Response): Promise<void> {
  try {
    const markers = await Marker.find({});
    res.json(markers);
  } catch (error: any) {
    console.error("Error retrieving markers:", error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

export async function addMarker(Marker: Model<IMarker>, req: Request, res: Response): Promise<void> {
  try {
    const { position, text } = req.body;
    const newMarker = new Marker({
      position,
      text,
    });
    await newMarker.save();
    res.status(201).json(newMarker);
  } catch (error: any) { 
    console.error("Error adding marker:", error.message);
    res.status(400).json({ message: "Error adding marker", error: error.message });
  }
}

export async function deleteMarker(Marker: Model<IMarker>, req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const result = await Marker.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: 'Marker deleted successfully' });
    } else {
      res.status(404).json({ message: 'Marker not found' });
    }
  } catch (error: any) {
    console.error("Error deleting marker:", error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}


export const updateMarker = async (Marker: Model<IMarker>, req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { position, text } = req.body;

  try {
    const updatedMarker = await Marker.findByIdAndUpdate(id, { position, text }, { new: true });
    if (updatedMarker) {
      res.json(updatedMarker);
    } else {
      res.status(404).json({ message: 'Marker not found' });
    }
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';
    if (typeof error === 'object' && error !== null && 'message' in error) {
      errorMessage = (error as { message: string }).message;
    }
    console.error("Error updating marker:", errorMessage);
    res.status(500).json({ message: 'Internal Server Error', error: errorMessage });
  }
};
