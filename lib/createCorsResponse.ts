// import { NextResponse } from "next/server";

// export function createCorsResponse(
//   body: any,
//   options: { status: number } = { status: 200 }
// ) {
//   return new NextResponse(JSON.stringify(body), {
//     status: options.status,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//     },
//   });
// }


import { NextResponse } from "next/server";

export function createCorsResponse(
  body: any,
  options: { status: number } = { status: 200 }
) {
  return new NextResponse(JSON.stringify(body), {
    status: options.status,
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    //   "Access-Control-Allow-Headers": "Authorization, Content-Type, Origin, Accept", // Ajouter les en-têtes nécessaires seulement
    //   "Access-Control-Max-Age": "86400", // Pour mettre en cache la réponse préliminaire
    // },
  });
}
