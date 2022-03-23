import React, { Fragment } from 'react';
import * as scale from 'd3-scale';
import * as d3Arr from 'd3-array';
import * as d3Shape from 'd3-shape';
import {select} from 'd3-selection';
import * as brush from 'd3-brush';
import './index.css';

import { TextAreaContext } from '../../Contexts/TextArea';

const SelectableArea = ({ onMove, dims }) => {
  if (!dims || !dims.height || !dims.width) {
    return <p>...loading</p>;
  }

  const {
    sentences,
    textAreaDispatch,
    areaData
  } = React.useContext(TextAreaContext);

  const [hoverArr, setHoverArr] = React.useState([0, 175]);
  const brushRef = React.useRef();

  /*
		called 'onBrush'
	*/
  const brushedFn = () => {
    const selectedPixels = select.event.selection;
    const scaledBegin = Math.floor(translateScale(selectedPixels[0]));
    const scaledEnd = Math.floor(translateScale(selectedPixels[1]));
    setHoverArr(selectedPixels);

    // dispatch Context-updater
    textAreaDispatch({ type: 'UPDATE_DISPLAY_TEXT_FROM_AREA', payload: [scaledBegin, scaledEnd] });

    // onMove([scaledBegin, scaledEnd]);
  };

  /*
		Set Area Context data 'initially',
			from textStore sentences array
	*/
  React.useEffect(() => {
    if (sentences && !areaData) {
      const preppedAreaData = [];
      sentences.forEach((s) => {
        preppedAreaData.push({ y: s.wordCount });
      });

      textAreaDispatch({type: 'SET_AREA_DATA', payload: preppedAreaData});
    }
  }, [sentences]);

  // //    //////////////////////// /////
  //	connect the brush to the g wrapper
  // //    //////////////////////// /////
  React.useEffect(() => {
    if (brushRef && brushRef.current && areaData) {
      // build the brushFn
      const thisBrushFN = brush.brushX()
      // .extent([0,0], [[700, 100]])
        .handleSize(10)
        .on('brush', brushedFn);

      // set the brushFn to the burshBox, 'instantiating'
      // the brush UI element(s)
      const thisBrushBox = select.select(brushRef.current);
      setTimeout(() => {
        thisBrushBox.call(thisBrushFN);

        // set the initial overlay to 1/4 width
        thisBrushFN.move(thisBrushBox, hoverArr);
      }, 10);
    }
  }, [brushRef, areaData, dims]);

  // ////////////////////////// /////
  // // default loading return /////
  // ////////////////////////// /////
  if (!areaData || !sentences) {
    return (<p>Loading areaData...</p>);
  }

  // //////////////////////// /////
  // 			If SourceData		   /////
  // //////////////////////// /////
  // Set Scales
  const xScale = scale.scaleLinear()
    .domain([0, areaData.length - 1])
    .range([0, dims.width]);

  const yScale = scale.scaleLinear()
    .domain([0, d3Arr.max(areaData, (d) => d.y)])
    .range([100, 0]);

  let translateScale = scale.scaleLinear()
    .domain([0, dims.width])
    .range([0, areaData.length - 1]);

  // build areaFn
  const areaFn = d3Shape.area()
    .x((d, i) => xScale(i + 1))
    .y0(100)
    .y1((d) => yScale(d.y))
    .curve(d3Shape.curveCatmullRom);

  const pathD = areaFn(areaData);

  if (!pathD || !xScale || !yScale || !areaFn || !translateScale) {
    return (<p>loading...</p>);
  }

  return (
    <svg id="selectable" style={dims}>
      <defs>
        <linearGradient id="myGradient" gradientTransform="rotate(90)">
          <stop offset="50%" stopColor="rgb(147,147,147)" />
          <stop offset="100%" stopColor="rgba(49,54,61,0)" />
        </linearGradient>
      </defs>
      <g className="g-wrapper">

        {/* Area Path */}
        <path
          d={pathD}
          fill="url(#myGradient)"
        />

        {/* Brush Handle */}
        <g className="brush-g-window" ref={brushRef} />

      </g>
    </svg>
  );
};

export default SelectableArea;
