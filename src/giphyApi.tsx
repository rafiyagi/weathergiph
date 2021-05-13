import { GiphyFetch } from '@giphy/js-fetch-api'
import { IGif } from "@giphy/js-types"
import {useState} from "react"

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY || 'fooGiphyApiKey'

const Giphy = (): [(searchTerm: string) => void, (IGif | null), string, boolean] => {
    const [gif, setGif] = useState<IGif | null>(null)
    const [processing, setProcessing] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const giphyFetch = new GiphyFetch(API_KEY)

    const getGif = async (searchTerm: string) => {
        try {
            setProcessing(true)
            // Limit 10 - not very performant but will help with rendering more of a variety of gifs
            const {data} = await giphyFetch.search(searchTerm, {sort: 'relevant', lang: 'en', limit: 10, type: 'gifs'})
            const randomIndex = Math.floor(Math.random() * 10)
            setGif(data?.[randomIndex])
            setProcessing(false)
        } catch(e) {
            setGif(null)
            setErrorMsg(e.message)
        }
    }

    return [getGif, gif, errorMsg, processing]
}

export default Giphy
