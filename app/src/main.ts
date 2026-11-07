import './style.css'
import { start } from './ui/app'

start(document.getElementById('app')!)

if (import.meta.env.PROD && 'serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js')
