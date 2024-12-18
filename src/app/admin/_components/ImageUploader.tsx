"use client";

import { UploadButton } from "@/utils/uploadthing";

const ImageUploader = ({
  onUploadComplete,
}: {
  onUploadComplete: (urls: string[]) => void;
}) => {
  return (
    <UploadButton
      endpoint="imageUploader" // Endpoint configuré pour accepter plusieurs fichiers
      onClientUploadComplete={(res) => {
        const urls = res.map((file) => file.url); // Récupère les URLs des fichiers uploadés
        onUploadComplete(urls); // Passe les URLs au parent
        alert("Upload terminé !");
      }}
      onUploadError={(error: Error) => {
        alert(`Erreur pendant l'upload : ${error.message}`);
      }}
    />
  );
};

export default ImageUploader;
