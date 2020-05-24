import fetch from "node-fetch"

export const apiBaseUrl = "/.netlify/functions"
export const asJson = url => fetch(url).then(res => res.json())
