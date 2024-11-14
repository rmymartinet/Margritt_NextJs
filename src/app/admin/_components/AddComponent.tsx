import { NextResponse } from "next/server";
import { useState } from "react";

const AddComponent = () => {
  const [category, setCategory] = useState("artworks");
  const [title, setTitle] = useState("");
  const [serie, setSerie] = useState("");
  const [piece, setPiece] = useState("");
  const [paper, setPaper] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [dimension, setDimension] = useState("");
  const [format, setFormat] = useState("");
  const [imageUrls, setImageUrls] = useState(["", "", "", ""]);
  const [text, setText] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logique pour soumettre le formulaire
    const newItem = {
      category,
      title,
      dimension,
      date,
      format,
      imageUrls: imageUrls.filter((url) => url !== ""),
    };

    if (category === "prints") {
      Object.assign(newItem, {
        serie,
        piece,
        paper,
        price: Number(price),
        stock: Number(quantity),
      });
    } else if (category === "project") {
      Object.assign(newItem, {
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
      setTitle("");
      setDimension("");
      setFormat("");
      setSerie("");
      setPiece("");
      setPaper("");
      setText("");
      setVideoUrl("");
      setPrice("");
      setDate("");
      setImageUrls(["", "", "", ""]);
      setQuantity("");
      return new NextResponse(JSON.stringify(postData), {
        status: 201,
      });
    } catch (err) {
      return new NextResponse(JSON.stringify({ error: err }), {
        status: 500,
      });
    }
  };

  return (
    <div className="flex w-1/2 flex-col items-center gap-10 rounded-xl bg-white p-5 shadow-lg">
      <h1 className="text-xl font-semibold text-green-500">
        Ok, là tu vas tout déchirer @gigabbmonstre ❤️
      </h1>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <label>
          Catégorie:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="artworks">Artworks</option>
            <option value="project">Project</option>
            <option value="prints">Prints</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          Titre:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Exemple : Bibulle 1"
            className="rounded-lg border border-slate-200 px-4"
          />
        </label>
        {category === "prints" && (
          <>
            <label className="flex items-center gap-2">
              Série:
              <input
                type="text"
                value={serie}
                onChange={(e) => setSerie(e.target.value)}
                required
                placeholder="Exemple : Bibulle"
                className="rounded-lg border border-slate-200 px-4"
              />
            </label>
            <label className="flex items-center gap-2">
              Pièce:
              <input
                type="text"
                value={piece}
                onChange={(e) => setPiece(e.target.value)}
                required
                placeholder="Exemple : 1re"
                className="rounded-lg border border-slate-200 px-4"
              />
            </label>
            <label className="flex items-center gap-2">
              Papier:
              <input
                type="text"
                value={paper}
                onChange={(e) => setPaper(e.target.value)}
                required
                placeholder="Ex: Lavis Vinci - 300 g"
                className="rounded-lg border border-slate-200 px-4"
              />
            </label>
          </>
        )}
        <label className="flex items-center gap-2">
          Date:
          <input
            type="string"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="rounded-lg border border-slate-200 px-4"
            placeholder="Exemple: 2019 - 2020"
          />
        </label>
        <label className="flex items-center gap-2">
          Dimension:
          <input
            type="string"
            value={dimension}
            onChange={(e) => setDimension(e.target.value)}
            placeholder="Ex: 50 x 70 cm"
            required
            className="rounded-lg border border-slate-200 px-4"
          />
        </label>
        <label className="flex items-center gap-2">
          Format:
          <input
            type="string"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            placeholder="Medium: medium-formats ou Large: large-formats ou Extra large: extra-large"
            required
            className="w-full rounded-lg border border-slate-200 px-4"
          />
        </label>
        {category === "artworks" && (
          <label className="flex flex-col gap-2">
            URLs des images disposition dans l&apos;ordre d&apos;affichage
            <input
              type="text"
              value={imageUrls[0]}
              onChange={(e) => {
                setImageUrls([e.target.value, ...imageUrls.slice(1)]);
              }}
              placeholder="Image URL"
              className="rounded-lg border border-slate-200 px-4"
            />
          </label>
        )}
        {(category === "prints" || category === "project") && (
          <label className="flex flex-col gap-2">
            URLs des images disposition dans l&apos;ordre d&apos;affichage
            {imageUrls.map((url, index) => (
              <input
                key={index}
                type="text"
                value={url}
                onChange={(e) => {
                  const newImageUrls = [...imageUrls];
                  newImageUrls[index] = e.target.value;
                  setImageUrls(newImageUrls);
                }}
                placeholder={`Image URL ${index + 1}`}
                className="rounded-lg border border-slate-200 px-4"
              />
            ))}
          </label>
        )}
        {category === "project" && (
          <>
            <label className="flex items-center gap-2">
              Text:
              <input
                type="string"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                className="rounded-lg border border-slate-200 px-4"
              />
            </label>
            <label className="flex items-center gap-2">
              VideoUrl:
              <input
                type="string"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder=" FORMAT MP4"
                required
                className="rounded-lg border border-slate-200 px-4"
              />
            </label>
          </>
        )}
        <label className="flex items-center gap-2">
          Prix:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="rounded-lg border border-slate-200 px-4"
            placeholder="Ex: 250 ou 600 €"
          />
        </label>
        {category === "prints" && (
          <label className="flex items-center gap-2">
            Quantité:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="rounded-lg border border-slate-200 px-4"
            />
          </label>
        )}
        <button type="submit" className="rounded bg-blue-500 p-2 text-white">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddComponent;
