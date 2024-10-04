"use client"
import { Class } from "@/types/class"
import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import styled from "./style.module.scss"

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export const EbookComponent = ({ classActive }: { classActive: Class }) => {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [fadeOut, setFadeOut] = useState(false)

  if (!classActive) return <></>

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
  }

  const handleTouch = (event: React.TouchEvent) => {
    const { clientX } = event.touches[0]
    const width = window.innerWidth

    if (clientX < width / 2) {
      setPageNumber(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage))
    } else if (clientX > width / 2) {
      setPageNumber(prevPage => (prevPage < numPages ? prevPage + 1 : prevPage))
    }
  }

  const changePage = (newPage: number) => {
    setFadeOut(true)
    return setTimeout(() => {
      setPageNumber(newPage)
      setFadeOut(false)
    }, 300)
  }

  return (
    <div className={styled.container}>
      <div className={styled.contentPdf}>
        <Document
          file={classActive?.linkClass}
          onLoadSuccess={onDocumentLoadSuccess}
          loading='Carregando Ebook...'
          onLoadError={error => console.error("Erro ao carregar o PDF:", error)}
        >
          <Page
            pageNumber={pageNumber}
            className={`${styled.page} ${fadeOut ? styled["page-exit"] : ""}`}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            onTouchStart={handleTouch}
          />
        </Document>
      </div>
      {numPages > 0 && (
        <div className={styled.containerControls}>
          <button
            className={styled.btnControl}
            disabled={pageNumber <= 1}
            onClick={() => changePage(pageNumber - 1)}
          >
            Anterior
          </button>
          <p className={styled.indicators}>
            Página {pageNumber} de {numPages}
          </p>
          <button
            className={styled.btnControl}
            disabled={pageNumber >= numPages}
            onClick={() => changePage(pageNumber + 1)}
          >
            Próximo
          </button>
        </div>
      )}
    </div>
  )
}
