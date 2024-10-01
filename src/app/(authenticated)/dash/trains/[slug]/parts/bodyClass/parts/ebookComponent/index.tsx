"use client"
import { Class } from "@/types/class"
import { useRef } from "react"
import { FiMaximize } from "react-icons/fi"
import "react-pdf/dist/Page/AnnotationLayer.css"
import styled from "./style.module.scss"

export const EbookComponent = ({ classActive }: { classActive: Class }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const iframePdf = useRef<HTMLIFrameElement | null>(null)

  const handleFullScreen = (): void => {
    const containerPdf = containerRef.current as HTMLElement

    if (!containerPdf) return

    const isFullScreen =
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement

    const enterFullScreen = (element: HTMLElement) => {
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if ((element as any).webkitRequestFullscreen) {
        ;(element as any).webkitRequestFullscreen()
      } else if ((element as any).mozRequestFullScreen) {
        ;(element as any).mozRequestFullScreen()
      } else if ((element as any).msRequestFullscreen) {
        ;(element as any).msRequestFullscreen()
      }
    }

    const exitFullScreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        ;(document as any).webkitExitFullscreen()
      } else if ((document as any).mozCancelFullScreen) {
        ;(document as any).mozCancelFullScreen()
      } else if ((document as any).msExitFullscreen) {
        ;(document as any).msExitFullscreen()
      }

      if (iframePdf && iframePdf?.current) {
        iframePdf.current.style.transform = ""
      }
    }

    if (isFullScreen) {
      exitFullScreen()
    } else {
      enterFullScreen(containerPdf)
    }
  }

  return (
    <div className={styled.container}>
      <div className={styled.contentPdf} ref={containerRef}>
        <iframe
          src={classActive?.linkClass}
          className={styled.frame}
          ref={iframePdf}
        />
        <button className={styled.btnFull} onClick={handleFullScreen}>
          <FiMaximize />
        </button>
      </div>
    </div>
  )
}
