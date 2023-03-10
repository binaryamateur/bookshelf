function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  }
  const fullUrl = `${process.env.REACT_APP_API_URL}/${endpoint}`
  console.log(fullUrl)
  return new Promise((resolve, reject) => {
    window
      .fetch(fullUrl, config)
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.status === 500) {
          reject(data)
        }
        resolve(data)
      })
  })
}

export {client}

/*






























💰 spoiler alert below...



























































const config = {
    method: 'GET',
    ...customConfig,
  }
*/
