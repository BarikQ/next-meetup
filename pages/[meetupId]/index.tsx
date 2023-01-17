import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import MeetupDetails from "../../components/meetups/MeetupDetails";
import { CONNECTION_STRING } from '../../static/index';
import { Meetup } from "../../types";

export default function MeetupDetailsPage({ meetupData }: { meetupData: Meetup }) {
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name='description' content={meetupData.description} />
      </Head>
      <MeetupDetails
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(CONNECTION_STRING);
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, { projection: { _id: 1 } }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map(({ _id }) => ({ params: { meetupId: _id.toString() } })),
  }
}

export async function getStaticProps(context: any) {
  const { meetupId } = context.params;
  const client = await MongoClient.connect(CONNECTION_STRING);
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });

  return {
    props: {
      meetupData: {
        id: meetup?._id.toString(),
        title: meetup?.title,
        image: meetup?.image,
        address: meetup?.address,
        description: meetup?.description,
      },
    },
  };
}
