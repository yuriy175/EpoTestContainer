import React, { useContext, useState, useRef, useEffect } from 'react';

import { PreviewSize } from '../../context/constants'
import * as Worker from '../../workers/miniViewerWorker'

const ImageItem = React.memo((props) => {
  console.log('! render ImageItem');

  const [selected, setSelected] = React.useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!imageRef) {
      return;
    }

    (async () => {
      const data = await Worker.LoadPreviewOnly(PreviewSize, image.FileId);
      imageRef.current.src = data;
    })();

  }, [imageRef]);

  const image = props.Image;
  const onSelectImage = async (ev) => {
    setSelected(!selected);
    await Worker.SelectImage(image?.Id);
  }

  return (
    <div className={'imageItem ' + (selected ? 'selectedImageItem' : '')} onClick={onSelectImage} title={image.FileId}>
      <div className="previewTitle" >
        Изображение {image.FileId}
      </div>
      <img ref={imageRef} />
    </div>
  );
});

export default ImageItem;