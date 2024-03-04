import { Schema, model } from 'mongoose';

const carouselSchema = new Schema({
  imgPath: String,
});

export const Carousel = model('Carousel', carouselSchema);
