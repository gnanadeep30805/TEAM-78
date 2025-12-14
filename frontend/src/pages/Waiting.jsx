import AppointmentStatus from "../components/AppointmentStatus";
import { useParams } from "react-router-dom";

export default function Waiting() {
  const { requestId } = useParams();
  return <AppointmentStatus requestId={requestId} />;
}
