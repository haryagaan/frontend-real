import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';

import style from "../styles/Carousel.module.css"

import { CarouselCard } from './CarouselCard.jsx';

import { Category } from './Category.jsx';

export const Carousel=({items})=>{
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // console.log(items)
  return (
    <div>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'black',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30, 
            backgroundColor: "#7246e5",
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            marginLeft:"8px"
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'black',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
            backgroundColor: "#7246e5",
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            marginRight:"8px"
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 4,
            itemsToScroll: 1,
            minWidth: 600,
          },
        ]}
        speed={400}
        easing="linear"
      >
        {
          items && items.map((item,i)=>{
            return(
              <Category item={item}></Category>
            )
          })
        }
      </ReactSimplyCarousel>
    </div>
  );
}
