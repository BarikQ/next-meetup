import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Meetup } from "../../types";

export default function NewMeetupPage() {
  const router = useRouter();

  const addMeetupHandler = async (meetupData: Meetup | any) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Create New Meetup</title>
        <meta name='description' content='Create your own amazing meetups!' />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}