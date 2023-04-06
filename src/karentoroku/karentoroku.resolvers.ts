import { PrismaClient } from "../../prisma/client";
import { ICreateEventType, ICreateUser } from "./karentoroku.interfaces";
import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../config/firebaseAdmin.json";

const firebaseApp = initializeApp({
  credential: credential.cert({
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    projectId: serviceAccount.project_id,
  }),
});

export const prisma = new PrismaClient();

// export const createUser = (args: ICreateUser) => {
//   getAuth(firebaseApp)
//     .verifyIdToken(args.idToken)
//     .then((decodedToken) => {
//       const uid = decodedToken.uid;
//       // ...
//       // console.log(uid);
//       return prisma.user.create({
//         data: {
//           name: args.name,
//           username: args.username,
//           firebaseUid: uid,
//         },
//       });
//     })
//     .catch((error) => {
//       // Handle error
//       console.log("Error:", error);
//     });
// };

// export const getUsers = () => {
//   return prisma.user.findMany({
//     select: {
//       name: true,
//       username: true,
//     },
//   });
// };

// export const getUserById = (args: { id: number }) => {
//   return prisma.user.findUniqueOrThrow({
//     select: {
//       name: true,
//       username: true,
//     },
//     where: {
//       id: args.id,
//     },
//   });
// };

// export const createLocation = (args: { name: string }) => {
//   return prisma.location.create({
//     data: {
//       name: args.name,
//     },
//   });
// };

// export const createEventType = async (args: ICreateEventType) => {
//   // const getEvent= await prisma.eventType.findMany()

//   return prisma.eventType.create({
//       data:
//       {
//         name: args.name,
//         description: args.description,
//         price: args.price,
//         timeDuration: args.timeDuration,
//         user: {
//           connect: {
//             id: args.userId,
//           },
//         },
//         eventTypeOnLocations:{
//           create: args.locations.map((l) => {
//             return{
//               location:{
//                 create:{
//                   name: l.locationName,
//                 }
//               }
//             }
//           })
//         }
//         },
//   });
// };

// export const getEventTypes = () => {
//   return prisma.eventType.findMany();
// };

export const createUser = (args: { name: string; username: string }) => {
  return prisma.user.create({
    data: {
      name: args.name,
      username: args.username,
    },
  });
};

export const createEvent = (args: {
  name: string;
  username: string;
  dates: { date: string}[];
}) => {
  return prisma.eventType.create({
    data: {
      name: args.name,
      username: args.username,
      dateSlots:{
        create: args.dates.map((r) => {
          return{
            date: new Date(r.date)
          }
        })
      }
    },
  });
};
