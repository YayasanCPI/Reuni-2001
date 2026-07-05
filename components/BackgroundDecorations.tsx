import React from 'react';
import { motion } from 'motion/react';

const BackgroundDecorations = () => {
  const decorations = [
    { src: "https://i.ibb.co.com/VcBNmv2m/cd4b207bdcaece512e5d66d78ca34d76-removebg-preview.png", top: "15%", left: "5%", rotate: -15, width: "180px", opacity: 0.2 },
    { src: "https://i.ibb.co.com/6ccgw1WM/baju-sma-removebg-preview.png", top: "35%", right: "8%", rotate: 10, width: "160px", opacity: 0.2 },
    { src: "https://i.ibb.co.com/xSmbkMvV/99c1af0377204d9e359901a40c064272-removebg-preview.png", top: "60%", left: "10%", rotate: -5, width: "200px", opacity: 0.2 },
    { src: "https://i.ibb.co.com/nN0RxX5D/818ed70aa2d28a57619e8a44cf1d50a6-removebg-preview-1.png", top: "80%", right: "12%", rotate: 20, width: "180px", opacity: 0.2 },
    { src: "https://i.ibb.co.com/7L6R7Ry/81c94f3d072c83cd7d7c0f03ba29cdcd-removebg-preview.png", top: "45%", left: "2%", rotate: -12, width: "150px", opacity: 0.2 },
    { src: "https://i.ibb.co.com/HfZmkkF7/60f957e339f3535fd4af3f1dd89a794b-removebg-preview.png", top: "70%", right: "2%", rotate: 15, width: "160px", opacity: 0.2 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {decorations.map((dec, idx) => (
        <motion.img
          key={idx}
          src={dec.src}
          alt=""
          className="absolute object-contain grayscale mix-blend-multiply"
          style={{
            top: dec.top,
            left: dec.left,
            right: dec.right,
            width: dec.width,
            opacity: dec.opacity,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [dec.rotate, dec.rotate + 3, dec.rotate - 3, dec.rotate]
          }}
          transition={{
            duration: 8 + idx * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundDecorations;
