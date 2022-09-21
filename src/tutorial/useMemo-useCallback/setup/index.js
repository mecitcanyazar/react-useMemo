import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useFetch } from '../../custom-hooks/setup/2-useFetch'

const url = 'https://course-api.com/javascript-store-products'

// her state veya prop değişikliğinde, bileşen yeniden oluşturulur

const pahalıyıHesapla = (data) => {
  // console.log(data);
  return data.reduce((total,item)=>{
    // console.log(item);
    const price = item.fields.price
    if(price >= total){
      total = price
    }
    return total
  },0) / 100
}



const Index = () => {
  const { products } = useFetch(url)
  
  const [count, setCount] = useState(0)
  const [card,setCard] = useState(0)

  const sepeteEkle = useCallback(() => {
    setCard((c)=> c + 1)
  },[card])

  const enPahalı = useMemo(()=>pahalıyıHesapla(products),[products]) // gereklilik dizesi eklemem gerekiyor.[products]
  return (
    <>
      <h1>Count : {count}</h1>
      <button className='btn' onClick={() => setCount((c) => c + 1)}>
        click me
      </button>
      <h1 style={{marginTop:"3rem"}}>Card : {card}</h1>
      <h1>En pahalısı : ${enPahalı}</h1>
      <BigList products={products} sepeteEkle={sepeteEkle} />
    </>
  )
}

const BigList =React.memo(({ products,sepeteEkle }) => {
  useEffect(()=>{
    console.log("Büyük liste çağrıldı");
  })
  return (
    <section className='products'>
      {products.map((product) => {  
        return <SingleProduct key={product.id} {...product} sepeteEkle={sepeteEkle}/>
      })}
    </section>
  )
})

const SingleProduct = ({ fields,sepeteEkle }) => {
  useEffect(()=>{
    console.count("tek ürün çağrıldı");
  })
  // console.log(fields);
  let { name, price } = fields
  price = price / 100
  const image = fields.image[0].url

  return (
    <article className='product'>
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
      <button onClick={sepeteEkle}>Sepete Ekle</button>
    </article>
  )
}

export default Index
