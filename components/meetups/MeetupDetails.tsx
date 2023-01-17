import { Meetup } from "../../types";
import classes from './MeetupDetails.module.css';

export default function MeetupDetails({ image, title, address, description }: Meetup) {
  return (
    <div className="w-full flex flex-col gap-2 text-center" >
      <img
        src={image}
        alt={title}
      />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </div>
  );
}
