import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"
import axios from "axios"



function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  function handlerToggleModal() {
    setShowModal(!showModal)
  }
  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`

      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}`

      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log('Fetched from cache today');
        return

      }
      localStorage.clear()

      try {
        const response = await axios.get(url)
        const apiData = response.data;
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log('Fetched from apiData cache ');


      } catch (error) {
        console.log(error.message);
        if (error.response) {
          console.error('Reaponse status', error.response.status)
        }
        console.error('Ошибка при получении данных:', error.message)
        console.error('Полный обьект ошибки', error)
        // console.log('response', response);

      }
    }
    fetchAPIData()
  }, [])

  return (
    <>
      {data ? (<Main data={data} />) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <SideBar data={data} handlerToggleModal={handlerToggleModal} />
      )}
      {data && (
        <Footer data={data} showModal={showModal} handlerToggleModal={handlerToggleModal} />
      )}
    </>
  )
}

export default App
