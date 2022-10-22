import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';

const baseStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out',
};

const activeStyle = {
  backgroundColor: 'black',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

function FileDragUploader() {
  const { thumbnail } = useNewJourneyValue();
  const { updateData } = useNewJourneyActions();
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);

    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    );

    updateData('thumbnail', acceptedFiles);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <img src={file.preview} alt={file.name} />
    </div>
  ));

  // clean up
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive && activeStyle),
      ...(isDragAccept && acceptStyle),
      ...(isDragReject && rejectStyle),
    }),
    [isDragActive, isDragAccept, isDragReject],
  );

  return (
    <section style={{ width: '100%', height: '100%' }}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div>Drag and drop your images here.</div>
      </div>
      <aside
        style={{
          display: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
      >
        {thumbs}
      </aside>
    </section>
  );
}

export default FileDragUploader;
