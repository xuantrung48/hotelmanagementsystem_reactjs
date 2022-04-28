const APIPath = {
  /*Common variables*/
  lang: localStorage.getItem('i18nextLng'),

  APIPath: process.env.API_PATH,
}

export default APIPath
