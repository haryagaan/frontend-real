import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';

import { CarouselCard } from './CarouselCard.jsx';


export const Carousel=()=>{
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

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
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30, 
            backgroundColor: "#7246e5"
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
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
            backgroundColor: "#7246e5"
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 5,
            itemsToScroll: 1,
            minWidth: 768,
          },
        ]}
        speed={400}
        easing="linear"
      >
       {/* <CarouselCard></CarouselCard>
       <CarouselCard></CarouselCard>
       <CarouselCard></CarouselCard>
       <CarouselCard></CarouselCard>
       <CarouselCard></CarouselCard>
       <CarouselCard></CarouselCard>
       <CarouselCard></CarouselCard>
       <CarouselCard></CarouselCard>
       <CarouselCard></CarouselCard> */}
      </ReactSimplyCarousel>
    </div>
  );
}
