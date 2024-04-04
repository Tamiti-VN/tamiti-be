import { Schema, model } from 'mongoose';

const carouselSchema = new Schema({
  fileName: { type: String },
});

export const Carousel = model('Carousel', carouselSchema);
