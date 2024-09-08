import { FiSearch } from "react-icons/fi"
import styled from "./style.module.scss"

const ContentSearch = () => {
 return (
  <article className={styled.contentSearch}>
   <FiSearch />
   <input placeholder="Busque por trilhas e ebooks" />
  </article>
 )
}

export default ContentSearch