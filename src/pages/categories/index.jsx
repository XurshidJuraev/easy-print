import React from 'react'
import { useParams } from 'react-router-dom'

function CategoryListByName() {
  const params = useParams()
  return (
    <div>CategoryListById {params.id}</div>
  )
}

export default CategoryListByName