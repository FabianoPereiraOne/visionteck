import { Class } from "@/types/class"
import { useRef, useState } from "react"
import { FiMaximize } from "react-icons/fi"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import styled from "./style.module.scss"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

export const EbookComponent = ({ classActive }: { classActive: Class }) => {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const containerRef = useRef<HTMLDivElement | null>(null)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
  }

  const handleFullScreen = () => {
    const containerPdf = containerRef.current as HTMLElement

    if (!containerPdf) return

    if (containerPdf.requestFullscreen) {
      containerPdf.requestFullscreen()
    }
  }

  return (
    <div className={styled.container}>
      <div className={styled.contentPdf} ref={containerRef}>
        <Document
          file='/Vision-Teck.pdf'
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={error => console.error("Erro ao carregar o PDF:", error)}
        >
          <Page pageNumber={pageNumber} className={styled.page} />
        </Document>
        <button className={styled.btnFull} onClick={handleFullScreen}>
          <FiMaximize />
        </button>
      </div>
      <div className={styled.containerControls}>
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Anterior
        </button>
        <p className={styled.indicators}>
          Página {pageNumber} de {numPages}
        </p>
        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Próximo
        </button>
      </div>
    </div>
  )
}
