import { Class } from "@/types/class"
import ReactPlayer from "react-player"
import styled from "./style.module.scss"

export const VideoComponent = ({ classActive }: { classActive: Class }) => {
  if (!classActive) return

  const preventContextMenu = (e: any) => {
    e.preventDefault()
  }

  return (
    <div className={styled.container} onContextMenu={preventContextMenu}>
      <ReactPlayer
        url={classActive?.linkClass}
        width='100%'
        height='100%'
        controls={true}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload"
            }
          }
        }}
        playing={false}
      />
    </div>
  )
}
