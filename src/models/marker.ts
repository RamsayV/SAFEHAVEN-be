import mongoose, { Document } from 'mongoose';

export interface IMarker extends Document {
  position: {
    lat: number;
    lng: number;
  };
  text: string;
}

const markerSchema = new mongoose.Schema({
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

const MarkerModel = mongoose.model<IMarker>('Marker', markerSchema);

export default MarkerModel;