// /api/new-meetup
import { MongoClient } from 'mongodb';

import { CONNECTION_STRING } from '../../static/index';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, image, address, description } = req.body;
    
    const client = await MongoClient.connect(CONNECTION_STRING);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne({ title, image, address, description });
  
    console.log(result);
    client.close();
    res.status(201).json({ message: 'Meetup created!' });
  }
}

export default handler;