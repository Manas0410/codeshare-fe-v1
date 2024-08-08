// @ts-nocheck

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const Infinitescroll = () => {
  const lastRef = useRef(null);
  const [Offset, setOffset] = useState(0);
  const [Data, setData] = useState([]);

  const callData = async () => {
    await axios
      .get(`https://api.escuelajs.co/api/v1/products?offset=${Offset}&limit=10`)
      .then((res) => {
        setData((prev) => [...prev, ...res.data]);
      });
  };

  useEffect(() => {
    callData();
  }, [Offset]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOffset((prev) => prev + 10);
        }
      },
      { threshold: 0.1 }
    );

    if (lastRef.current) {
      observer.observe(lastRef.current);
    }

    return () => {
      if (lastRef.current) {
        observer.unobserve(lastRef.current);
      }
    };
  }, [Data]);

  return (
    <div>
      {Data.map((item, index) => (
        <div
          key={item.id}
          className="h-40"
          ref={index === Data.length - 1 ? lastRef : null}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default Infinitescroll;
