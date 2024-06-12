"use client";
import React, { useEffect, useState } from "react";
import img1 from "../../../../public/assets/image-1.webp";
import img2 from "../../../../public/assets/image-2.webp";
import img3 from "../../../../public/assets/image-3.webp";
import img4 from "../../../../public/assets/image-4.webp";
import img5 from "../../../../public/assets/image-5.webp";
import img6 from "../../../../public/assets/image-6.webp";
import img7 from "../../../../public/assets/image-7.webp";
import img8 from "../../../../public/assets/image-8.webp";
import img9 from "../../../../public/assets/image-9.webp";
import img10 from "../../../../public/assets/image-10.jpeg";
import img11 from "../../../../public/assets/image-11.jpeg";
import Image from "next/image";
import { Draggable } from "react-drag-reorder";
import {
  arrayMove,
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";

const Handle = SortableHandle(({ tabIndex }) => (
  <div
    className="absolute top-3 block w-full opacity-0 cursor-grab "
    tabIndex={tabIndex}>
    <svg viewBox="0 0 50 50">
      <path
        d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 L 0 7.5 z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 L 0 22.5 z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 L 0 37.5 z"
        color="#000"
      />
    </svg>
  </div>
));

const SortableItem = SortableElement(props => {
  const { value: item } = props;
  // console.log(props.clickedImage);

  return (
    <div className="">
      <div className="relative img-container border-2 rounded hover:border-blue-500  ">
        <Image src={item} alt="image" />
        {props.shouldUseDragHandle && <Handle />}
        <input
          onClick={() => {
            props.getClickedImage(item);
            props.setShowCheckboxes(true);
          }}
          className={
            props.showCheckboxes
              ? "block absolute top-2 left-2  cursor-pointer  "
              : "absolute top-2 left-2 hidden cursor-pointer "
          }
          type="checkbox"
        />
      </div>
    </div>
  );
});

const SortableList = SortableContainer(props => {
  const { items, ...restProps } = props;
  return (
    <div className="grid grid-cols-5 gap-5 gallery">
      {items.map((item, index) => (
        <SortableItem
          key={`item-${item.id}`}
          index={index}
          value={item}
          {...restProps}
        />
      ))}
    </div>
  );
});
const Gallery = () => {
  const imagesArray = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
  ];

  const [images, setImages] = useState(imagesArray);
  const [clickedImage, setClickedImage] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const getClickedImage = img => {
    if (clickedImage.includes(img)) {
      setClickedImage(clickedImage.filter(image => image !== img));
    } else {
      setClickedImage([...clickedImage, img]);
    }
    // console.log(clickedImage);
  };

  const removeImages = () => {
    setImages(images.filter(img => !clickedImage.includes(img)));
    setClickedImage([]);
    setShowCheckboxes(false);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setImages(arrayMove(images, oldIndex, newIndex));
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center py-3 border-b-2">
        <div>
          <input type="checkbox" checked={clickedImage.length ? true : false} />
          <label className="ml-2 text-xl font-semibold">
            {clickedImage.length} Files Selected{" "}
          </label>
        </div>
        <div>
          <button
            onClick={() => removeImages()}
            className="border-2 border-red-500 py-2 px-3 rounded text-red-700 hover:bg-red-500 hover:text-white duration-300">
            Delete files
          </button>
        </div>
      </div>
      <div className="my-3">
        <SortableList
          shouldUseDragHandle={true}
          useDragHandle
          axis="xy"
          items={images}
          onSortEnd={onSortEnd}
          getClickedImage={getClickedImage}
          showCheckboxes={showCheckboxes}
          setShowCheckboxes={setShowCheckboxes}
          clickedImage={clickedImage}
        />
      </div>
    </div>
  );
};

export default Gallery;
