const getPeople = async () => {
    try {
      const response = await fetch("http://localhost:3001/persons")
      const jsonData = await response.json()
      return jsonData.persons

    } catch (error) {
      console.error(error.message)
    }

  }

  const postData = async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }

  const deleteData = async (url) => {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: null
    })
    return response.json()
  }

  const updateData = async (url, data) => {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }

const obj = {
    getPeople, postData, deleteData, updateData
}  

export default obj