export default {
  loading: true,
  error: null,
  viewSettings: {
    grid: false,
    filterBy: '',
    orderBy: '',
  },
  activeCatalogo: {
    placeholder: true,
    title: '---- --- -- ------',
    startDate: '------------',
    saleDate: '------------',
    endDate: '------------',
    lotes: [
      {
        title: '-------- -------',
        artista: {
          name: '---------- -----------',
        },
      },
    ],
  },
  pastCatalogos: [
    {
      placeholder: true,
      title: '---- --- -- ------',
      startDate: '------------',
      saleDate: '------------',
      endDate: '------------',
      lotes: [
        {
          title: '-------- -------',
          artista: {
            name: '---------- -----------',
          },
        },
      ],
    },
  ],
  futureCatalogos: [
    {
      placeholder: true,
      title: '---- --- -- ------',
      startDate: '------------',
      saleDate: '------------',
      endDate: '------------',
      lotes: [
        {
          title: '-------- -------',
          artista: {
            name: '---------- -----------',
          },
        },
      ],
    },
  ],
  countdown: {
    currentTime: Date.now(),
    saleSoon: false,
    saleStarted: false,
    saleEnded: false,
  },
};
