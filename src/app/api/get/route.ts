import { NextResponse } from "next/server";
import prisma from "../../../../utils/connect";

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;
  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}

function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

export const GET = async () => {
  try {
    await prisma.$connect();
    const [originalsData, galleryData] = await Promise.all([
      prisma.originals.findMany(),
      prisma.gallery.findMany(),
    ]);
    const data = [...originalsData, ...galleryData];
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error fetching pants:", error);

    // Si une erreur de connexion à la base de données se produit
    if (
      error instanceof Error &&
      error.message.includes("Database connection error")
    ) {
      return new NextResponse(
        JSON.stringify({ error: "Database connection error" }),
        { status: 500 },
      );
    }

    // Pour toute autre erreur, renvoie un message d'erreur générique
    const message = getErrorMessage(error);
    return new NextResponse(JSON.stringify({ error: message }), {
      status: 500,
    });
  }
};
