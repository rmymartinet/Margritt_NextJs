"use client";

import useWindowWidth from "@/app/hooks/useWindowWidth";
import React, { useEffect, useRef } from "react";

interface Data {
  id: number;
  date: string;
  title: string;
  location: string;
}

const GenericList = ({
  data,
  columns,
  mainTitle,
}: {
  data: Data[];
  columns: string;
  mainTitle: string;
}) => {
  const itemRef = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const { width } = useWindowWidth();

  // Initialisation des références
  useEffect(() => {
    itemRef.current = data.map(() => React.createRef<HTMLDivElement>());
  }, [data]); // Réinitialiser lorsque les données changent

  return (
    <div
      className="grid"
      style={{
        gridAutoRows: width < 768 ? "1fr" : "minmax(0, 1fr)",
      }}
    >
      <div className="mb-4 justify-self-center text-2xl font-semibold uppercase md:justify-self-start">
        <h2>{mainTitle}</h2>
      </div>
      {data.map((item: Data, index: number) => (
        <div
          ref={itemRef.current[index]}
          className={`border-b border-black py-4 text-lg ${width < 768 ? "flex flex-col justify-center gap-4" : "grid items-center gap-8"}`}
          style={{ gridTemplateColumns: columns }}
          key={item.id}
        >
          {width < 768 ? (
            <>
              <div className="flex w-full justify-between">
                <span className="font-semibold">{item.date}</span>
                <span>{item.location}</span>
              </div>
              <p className="text-center">{item.title}</p>
            </>
          ) : (
            <>
              <span className="font-semibold">{item.date}</span>
              <p className="items-center text-left">{item.title}</p>
              <p className="justify-self-end">{item.location}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default GenericList;
