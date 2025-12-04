import React from "react";
import "./Avatar.css";

interface AvatarProps {
  src?: string | null;
  size?: number;
  alt?: string;
}

export default function Avatar({ src, size = 40, alt = "avatar" }: AvatarProps) {
  return (
    <div
      className="custom-avatar"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: "#ccc",
        flexShrink: 0,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
          }}
        ></div>
      )}
    </div>
  );
}
