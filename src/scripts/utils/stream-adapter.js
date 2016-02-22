export const adjustStreams = streams => {
  return streams.map(({ type, url }) => {
    return {
      type: `video/${type}`,
      src: url
    };
  });
};
