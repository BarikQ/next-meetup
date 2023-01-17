import { MongoClient } from "mongodb";
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";

import { CONNECTION_STRING } from '../static/index';
import { Meetup } from "../types";

export default function HomePage({ meetups }: { meetups: Meetup[] }) {
  return (
    <>
      <Head>
        <title>NextJS Meetups</title>
        <meta name='description' content='Browse a huge list of highly active NextJS meetups!' />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
}

// export async function getServerSideProps(context: any) {
//   const { req, res } = context;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(CONNECTION_STRING);
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(({ title, image, address, _id }) => ({
        title,
        image,
        address,
        id: _id.toString(),
      })),
    },
    revalidate: 10,
  };
}
