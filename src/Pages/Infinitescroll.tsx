// @ts-nocheck

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const Infinitescroll = () => {
  const lastRef = useRef(null);
  const [Offset, setOffset] = useState(0);
  const [Data, setData] = useState([]);

  useEffect(() => {
    const callData = async () => {
      await axios
        .get(
          `https://api.escuelajs.co/api/v1/products?offset=${Offset}&limit=10`
        )
        .then((res) => setData((prev) => [...prev, ...res.data]));
    };
    callData();
  }, [Offset]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && lastRef.current) {
          setOffset((prev) => prev + 10);
        }
      },
      { threshold: 0.1 }
    );

    if (lastRef.current) {
      observer.observe(lastRef.current);
    }

    return () => observer.unobserve(lastRef.current);
  }, []);

  return (
    <div>
      {Data.map((item) => (
        <div key={item.id} className="h-20">
          {item.title}
        </div>
      ))}
      <div ref={lastRef}></div>
    </div>
  );
};

export default Infinitescroll;
