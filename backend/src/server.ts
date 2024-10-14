import fastify from "fastify";
import cors from "@fastify/cors";
import { createTrip } from "./router/create-trip";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { confirmTrip } from "./router/confirm-trip";
import { confirmParticipants } from "./router/confirm-participants";
import { createActivity } from "./router/create-activity";
import { getActivities } from "./router/get-activities";
import { createLink } from "./router/create-link";
import { getLinks } from "./router/get-links";
import { getParticipants } from "./router/get-participants";
import { createInvite } from "./router/create-invite";
import { updateTrip } from "./router/update-trip";
import { getTripDetails } from "./router/get-trip-details";
import { getParticipant } from "./router/get-participant";
import { errorHandler } from "./error-handler";
import { env } from "./env";

const app = fastify();

app.register(cors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler)

app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipants);
app.register(createActivity);
app.register(getActivities);
app.register(createLink);
app.register(getLinks);
app.register(getParticipants);
app.register(createInvite);
app.register(updateTrip);
app.register(getTripDetails);
app.register(getParticipant);

app.listen({ port: env.PORT }).then(() => {
  console.log("Sever running");
});
