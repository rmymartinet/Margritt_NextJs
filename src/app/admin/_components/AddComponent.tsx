"use client";

import { useState } from "react";
import { NextResponse } from "next/server";
import ImageUploader from "./ImageUploader";
import VideoUploader from "./VideoUploader";
import { NewItem } from "@/types/dataTypes";
import Image from "next/image";

const AddComponent = () => {
  const [category, setCategory] = useState("artworks");
  const [subCategory, setSubCategory] = useState("maxi"); // Valeur par défaut
  const [title, setTitle] = useState("");
  const [materials, setMaterials] = useState("");
  const [serie, setSerie] = useState("");
  const [piece, setPiece] = useState("");
  const [paper, setPaper] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [dimension, setDimension] = useState("50 x 70 cm"); // Valeur par défaut
  const [format, setFormat] = useState("medium-formats"); // Valeur par défaut
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(""); // Pour le thumbnail
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (category === "artworks" && !subCategory) {
      alert("Veuillez sélectionner une sous-catégorie pour les artworks.");
      return;
    }

    const newItem: NewItem = {
      title,
      dimension,
      date,
      format,
      imageUrls,
      serie,
      paper,
      thumbnailUrl,
    };

    if (category === "prints") {
      Object.assign(newItem, {
        category,
        piece,
        price: Number(price),
        stock: Number(quantity),
      });
    } else if (category === "artworks") {
      Object.assign(newItem, {
        subCategory,
        materials,
        text,
        videoUrl,
      });
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'article");
      }

      const postData = await response.json();
      console.log("Article ajouté :", postData);

      // Réinitialiser le formulaire après soumission
      setCategory("artworks");
      setSubCategory("maxi");
      setTitle("");
      setDimension("50 x 70 cm");
      setFormat("medium-formats");
      setSerie("");
      setPiece("");
      setPaper("");
      setText("");
      setVideoUrl("");
      setPrice("");
      setDate("");
      setThumbnailUrl("");
      setImageUrls([]);
      setQuantity("");
      setMaterials("");
      return new NextResponse(JSON.stringify(postData), { status: 201 });
    } catch (err) {
      console.error("Erreur :", err);
      return new NextResponse(JSON.stringify({ error: err }), { status: 500 });
    }
  };

  return (
    <section className="grid grid-cols-2">
      <div className="flex w-full flex-col items-center gap-10 rounded-xl bg-white p-5 shadow-lg">
        <h1 className="text-xl font-semibold text-green-500">
          Ajouter un nouvel article
        </h1>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <label>
            Catégorie:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="artworks">Artworks</option>
              <option value="prints">Prints</option>
            </select>
          </label>

          {category === "artworks" && (
            <label>
              Sous-catégorie:
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="maxi">Maxi</option>
                <option value="mini">Mini</option>
              </select>
            </label>
          )}

          <label>
            Dimension:
            <select
              value={dimension}
              onChange={(e) => setDimension(e.target.value)}
            >
              <option value="50 x 70 cm">50 x 70</option>
              <option value="120 x 80 cm">120 x 80</option>
            </select>
          </label>

          <label>
            Formats:
            <select value={format} onChange={(e) => setFormat(e.target.value)}>
              <option value="medium-formats">medium</option>
              <option value="large-formats">large</option>
            </select>
          </label>

          <label>
            Titre:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Exemple : Bibulle 1"
              className="p-2"
            />
          </label>

          <label>
            Série:
            <input
              type="text"
              value={serie}
              onChange={(e) => setSerie(e.target.value)}
              required
              placeholder="Exemple : Bibulle"
              className="p-2"
            />
          </label>

          <label>
            Papier:
            <input
              type="text"
              value={paper}
              onChange={(e) => setPaper(e.target.value)}
              required
              placeholder="Ex: Lavis Vinci - 300 g"
              className="p-2"
            />
          </label>

          {category === "artworks" && (
            <label>
              Matériaux:
              <input
                type="text"
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
                required
                placeholder="Ex: Acrylique, encre, pastel"
                className="p-2"
              />
            </label>
          )}

          {category === "prints" && (
            <>
              <label>
                Pièce:
                <input
                  type="text"
                  value={piece}
                  onChange={(e) => setPiece(e.target.value)}
                  required
                  placeholder="Exemple : 1re"
                  className="p-2"
                />
              </label>

              <label>
                Prix:
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  placeholder="Exemple : 250"
                  className="p-2"
                />
              </label>

              <label>
                Quantité:
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="p-2"
                />
              </label>
            </>
          )}

          <label>
            Date:
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              placeholder="Exemple: 2019 - 2020"
              className="p-2"
            />
          </label>

          {category === "artworks" && (
            <>
              <label>
                Description:
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  placeholder="Description de l'oeuvre"
                  className="w-full p-2"
                />
              </label>

              <label>
                Vidéo (
                <span className="font-semibold text-red-500">1 video max</span>
                ):
                <VideoUploader
                  onUploadComplete={(urls) => {
                    if (urls.length > 0) {
                      setVideoUrl(urls[0]); // Stocke l'URL de la vidéo
                    }
                  }}
                />
              </label>
              {videoUrl && (
                <video controls className="h-40 w-60">
                  <source src={videoUrl} type="video/mp4" />
                  Votre navigateur ne supporte pas les vidéos.
                </video>
              )}
            </>
          )}

          <label>
            Thumbnail (Image principale:{" "}
            <span className="font-semibold text-red-500">1 max</span>):
            <ImageUploader
              onUploadComplete={(urls) => {
                if (urls.length > 0) {
                  setThumbnailUrl(urls[0]); // Stocke uniquement la première image
                }
              }}
            />
          </label>
          {thumbnailUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnailUrl}
              alt="Thumbnail"
              className="h-20 w-20 object-cover"
            />
          )}

          <label>
            <p className="mb-4">
              {" "}
              Images de détail{" "}
              <span className="font-medium text-red-500">
                ({category === "artworks" ? 3 : 4}{" "}
                {category === "artworks"
                  ? "max"
                  : "max + dedans remet l'image principale"}
                ):
              </span>
            </p>{" "}
            <ImageUploader
              onUploadComplete={(urls) => {
                setImageUrls((prev) => [...prev, ...urls]); // Ajoute plusieurs images
              }}
            />
          </label>
          {imageUrls.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {imageUrls.map((url, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="h-20 w-20 object-cover"
                />
              ))}
            </div>
          )}

          <button type="submit" className="rounded bg-blue-500 p-2 text-white">
            Ajouter
          </button>
        </form>
      </div>
      {category === "artworks" && (
        <div className="grid w-full grid-rows-3 items-center gap-4 bg-white py-4">
          <div className="grid h-[30vh] w-full place-content-center bg-slate-400">
            <p className="font-semibold">Image Principale</p>
            <p>Donc ici la thumbnail</p>
          </div>
          <div className="flex w-full gap-2">
            <div className="flex h-[30vh] w-full flex-col items-center justify-center bg-slate-400">
              <p className="font-semibold">Image details 1</p>
              <p>La premier que tu veux mettre</p>
            </div>
            <div className="flex h-[30vh] w-full flex-col items-center justify-center bg-slate-400">
              <p className="font-semibold">Image details 2</p>
              <p>La deuxieme que tu veux mettre</p>
            </div>
            <div className="flex h-[30vh] w-full flex-col items-center justify-center bg-slate-400">
              <p className="font-semibold">Image details 3</p>
              <p>La troisieme que tu veux mettre</p>
            </div>
          </div>
          <div className="flex w-full gap-2">
            <div className="grid h-[30vh] w-full place-content-center bg-slate-400">
              <p className="font-semibold">Video</p>
            </div>
            <div className="grid h-[30vh] w-full place-content-center bg-slate-400">
              <p className="font-semibold">Partie pour la description</p>
            </div>
          </div>
        </div>
      )}

      {category === "prints" && (
        <div className="flex h-screen w-full flex-col items-center">
          <h1 className="text-3xl">Shéma</h1>
          <p>
            Ça ressemble à ça pour ceux qui seront en horizontal et vertical.
          </p>
          <div className="mt-4 h-[50vh]">
            <Image
              src="/assets/horizontalprints.png"
              alt=""
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-[50vh]">
            <Image
              src="/assets/verticalprints.png"
              alt=""
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      {category === "prints" && (
        <div className="mt-10 flex h-screen w-full flex-col items-center">
          <h1 className="text-3xl">Shéma</h1>
          <p>Ça ressemble à ça pour les details.</p>
          <div className="mt-4 h-[50vh]">
            <Image
              src="/assets/details.png"
              alt=""
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default AddComponent;
