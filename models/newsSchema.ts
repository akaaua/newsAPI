import { text } from 'body-parser';
import { link } from 'fs';
import * as mongoose from 'mongoose';
import { title } from 'process';

const NewsSchema = new mongoose.Schema({
    hat: {type:String},
    title: {type:String},
    text: {type:String},
    author: {type:String},
    img: {type:String},
    publishDate: {type:Date},
    link: {type:String},
    active: {type:Boolean}
    
});

export default NewsSchema;