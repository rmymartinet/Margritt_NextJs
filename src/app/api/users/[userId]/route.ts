import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { userId } = params;

  const cleanedUserId = userId.trim();

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: cleanedUserId }, // Requête avec le clerkId
    });

    console.log("user", user); // Log de l'utilisateur

    const userisequal = user.clerkId === cleanedUserId;

    console.log("userisequal", userisequal); // Log de la comparaison

    if (!user) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 },
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erreur :", error); // Log de l'erreur
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'utilisateur" },
      { status: 500 },
    );
  }
}
