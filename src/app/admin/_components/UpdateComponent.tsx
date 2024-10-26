import { Item } from "@/types/dataTypes";
import Image from "next/image";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

const UpdateComponent = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItemId, setEditItemId] = useState<string | null>(null);

  // Récupérer les articles depuis l'API au chargement
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/products", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des articles");
        }

        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur:", err);
      }
    };

    fetchItems();
  }, []);
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

  const handleUpdate = async (e: React.FormEvent, item: Item) => {
    e.preventDefault();
    // Logique pour soumettre le formulaire
    const newItem = {
      id: item.id,
      category: item.category,
      title: title || item.title,
      dimension: dimension || item.dimension,
      date: date || item.date,
      format: format || item.format,
      imageUrls:
        item.category === "gallery"
          ? imageUrls[0]
            ? [imageUrls[0]]
            : item.imageUrls
          : imageUrls.filter((url) => url !== "") || item.imageUrls,
    };

    if (item.category === "original") {
      Object.assign(newItem, {
        serie: serie || item.serie,
        piece: piece || item.piece,
        paper: paper || item.paper,
        price: price ? Number(price) : item.price,
        stock: quantity ? Number(quantity) : item.stock,
      });
    } else if (item.category === "project") {
      Object.assign(newItem, {
        text: text || item.text,
        videoUrl: videoUrl || item.videoUrl,
      });
    }
    try {
      const response = await fetch("/api/products", {
        method: "PUT",
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

  if (loading) return <div>Chargement des articles...</div>;

  return (
    <div className="flex w-3/4 flex-col items-center gap-10 rounded-xl bg-white p-5 shadow-lg">
      <h1 className="text-xl font-semibold text-blue-500">
        Mettre à jour des articles
      </h1>
      {items.length === 0 ? (
        <p>Aucun article disponible.</p>
      ) : (
        <ul className="flex w-full flex-col gap-4">
          {items.map((item) => (
            <li key={item.id} className="flex flex-col gap-2 border-b pb-2">
              {editItemId === item.id ? (
                // Formulaire de mise à jour
                <form
                  onSubmit={(e) => handleUpdate(e, item)}
                  className="flex flex-col gap-2"
                >
                  <label className="flex items-center gap-2">
                    Titre:
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Exemple : Bibulle 1"
                      className="rounded-lg border border-slate-200 px-4"
                    />
                  </label>
                  {item.category === "original" && (
                    <>
                      <label className="flex items-center gap-2">
                        Série:
                        <input
                          type="text"
                          value={serie}
                          onChange={(e) => setSerie(e.target.value)}
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
                      className="rounded-lg border border-slate-200 px-4"
                    />
                  </label>
                  <label className="flex items-center gap-2">
                    Format:
                    <input
                      type="string"
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className="rounded-lg border border-slate-200 px-4"
                    />
                  </label>
                  {item.category === "gallery" && (
                    <label className="flex flex-col gap-2">
                      URLs des images disposition dans l&apos;ordre
                      d&apos;affichage
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
                  {(item.category === "original" ||
                    item.category === "project") && (
                    <label className="flex flex-col gap-2">
                      URLs des images disposition dans l&apos;ordre
                      d&apos;affichage
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
                  {item.category === "project" && (
                    <>
                      <label className="flex items-center gap-2">
                        Text:
                        <input
                          type="string"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          className="rounded-lg border border-slate-200 px-4"
                        />
                      </label>
                      <label className="flex items-center gap-2">
                        VideoUrl:
                        <input
                          type="string"
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
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
                      className="rounded-lg border border-slate-200 px-4"
                      placeholder="Ex: 250 ou 600 €"
                    />
                  </label>
                  {item.category === "original" && (
                    <label className="flex items-center gap-2">
                      Quantité:
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="rounded-lg border border-slate-200 px-4"
                      />
                    </label>
                  )}
                  <button
                    type="submit"
                    className="rounded bg-green-500 p-2 text-white"
                  >
                    Mettre à jour
                  </button>
                </form>
              ) : (
                // Vue normale de l'article
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-20">
                    <Image
                      src={item.imageUrls[0]}
                      width={100}
                      height={100}
                      alt=""
                    />
                    <div className="grid grid-cols-2 items-center gap-4">
                      <strong>{item.title}</strong> - {item.price}€ -{" "}
                      {item.quantity} pièces
                    </div>
                  </div>
                  <button
                    onClick={() => setEditItemId(item.id)}
                    className="rounded bg-yellow-500 p-2 text-white"
                  >
                    Modifier
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpdateComponent;
