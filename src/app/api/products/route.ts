import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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

export const POST = async (req: Request) => {
  try {
    const item = await req.json();

    let data;

    if (item.category === "original") {
      data = await prisma.originals.create({
        data: item,
      });
    } else if (item.category === "gallery") {
      data = await prisma.gallery.create({
        data: item,
      });
    } else if (item.category === "project") {
      data = await prisma.gallery.create({
        data: item,
      });
    }
    return NextResponse.json({
      status: 201,
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json({
      status: 500,
      body: JSON.stringify({ error: getErrorMessage(error) }),
    });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { id, category } = await req.json();

    let data;

    if ((id && category === "gallery") || category === "project") {
      data = await prisma.gallery.delete({
        where: {
          id,
        },
      });
    } else if (id && category === "original") {
      data = await prisma.originals.delete({
        where: {
          id,
        },
      });
    } else {
      return new NextResponse(
        JSON.stringify({ error: "Missing id in request body" }),
        { status: 400 },
      );
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error deleting item:", error);
    return new NextResponse(JSON.stringify({ error: getErrorMessage(error) }), {
      status: 500,
    });
  }
};

export const PUT = async (req: Request) => {
  try {
    const { id, category, ...item } = await req.json();

    let data;
    if (id && category === "gallery") {
      data = await prisma.gallery.update({
        where: {
          id,
        },
        data: item,
      });
    } else if (id && category === "original") {
      data = await prisma.originals.update({
        where: {
          id,
        },
        data: item,
      });
    } else {
      return new NextResponse(
        JSON.stringify({ error: "Missing id in request body" }),
        { status: 400 },
      );
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error updating item:", error);
    return new NextResponse(JSON.stringify({ error: getErrorMessage(error) }), {
      status: 500,
    });
  }
};
