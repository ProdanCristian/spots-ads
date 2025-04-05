"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function ThemeMeta() {
    const { resolvedTheme, theme } = useTheme()

    useEffect(() => {
        const updateThemeMeta = () => {
            let viewport = document.querySelector("meta[name='viewport']")
            if (!viewport) {
                viewport = document.createElement("meta")
                viewport.setAttribute("name", "viewport")
                viewport.setAttribute("content", "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1")
                document.head.appendChild(viewport)
            }

            // For regular browsers - theme-color meta tag
            let metaThemeColor = document.querySelector("meta[name='theme-color']")
            if (!metaThemeColor) {
                metaThemeColor = document.createElement("meta")
                metaThemeColor.setAttribute("name", "theme-color")
                document.head.appendChild(metaThemeColor)
            }

            // For iOS devices - apple-mobile-web-app-status-bar-style
            let statusBarStyle = document.querySelector("meta[name='apple-mobile-web-app-status-bar-style']")
            if (!statusBarStyle) {
                statusBarStyle = document.createElement("meta")
                statusBarStyle.setAttribute("name", "apple-mobile-web-app-status-bar-style")
                document.head.appendChild(statusBarStyle)
            }

            // For iOS devices - enable web app mode
            let webAppCapable = document.querySelector("meta[name='apple-mobile-web-app-capable']")
            if (!webAppCapable) {
                webAppCapable = document.createElement("meta")
                webAppCapable.setAttribute("name", "apple-mobile-web-app-capable")
                webAppCapable.setAttribute("content", "yes")
                document.head.appendChild(webAppCapable)
            }

            // For Microsoft browsers
            let msApplication = document.querySelector("meta[name='msapplication-TileColor']")
            if (!msApplication) {
                msApplication = document.createElement("meta")
                msApplication.setAttribute("name", "msapplication-TileColor")
                document.head.appendChild(msApplication)
            }

            const currentTheme = resolvedTheme || theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

            if (currentTheme === "dark") {
                metaThemeColor.setAttribute("content", "#09090b")
                statusBarStyle.setAttribute("content", "black-translucent")
                msApplication.setAttribute("content", "#09090b")
            } else {
                metaThemeColor.setAttribute("content", "#ffffff")
                statusBarStyle.setAttribute("content", "default")
                msApplication.setAttribute("content", "#ffffff")
            }
        }

        updateThemeMeta()
        const timeoutId = setTimeout(updateThemeMeta, 100)

        return () => clearTimeout(timeoutId)
    }, [resolvedTheme, theme])

    return null
}