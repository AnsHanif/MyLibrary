import React ,{useContext,useEffect,useState}from 'react'
import "./Orders.css"
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { collection,getDocs,query,where} from 'firebase/firestore/lite';
import { firestore } from '../../../config/firebase';
import { AuthContext2 } from '../../../contexts/AuthContext2';
import { Link } from 'react-router-dom';
// import dayjs  from 'dayjs';
export default function Orders() {
  const { user } = useContext(AuthContext2)
  const [documents, setdocuments] = useState([])
  const [isLoading, setisLoading] = useState(true)
  console.log("documents",documents)
    const collectionName = 'Orders'
  const docCollectionRef = collection(firestore, collectionName)
  const readDocs = async () => {
    let array = [];
    const q = query(docCollectionRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      array.push({ ...doc.data(), id: doc.id });
    });
    setdocuments(array);
    setisLoading(false)
  };
  
  useEffect(() => {
    readDocs()
  }, [user])

  // const date = documents.map((t)=>t.dateAddedInFav)
  // console.log("date",date)
  
  return (
    <div>
      <h1 className='p-4 text-center'>Customer's Orders <RiShoppingBag3Fill size={30} style={{ marginBottom: "5px" }} /></h1>
      <hr />
      <div className='pt-4 pb-5 pl-5 pr-5'>
      {isLoading ? (
                <div className="text-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              ) :
        (
        <>
        {!documents.length == "" ? (
          
          documents.map((t,i)=>{
            return <>
          <h3>Order No. {i+1}</h3>
          <Table className="mb-3">
          <Thead>
          <Tr>
          <Th>Buyer Name</Th>
          <Th>Book Name</Th>
              <Th>Price</Th>
              <Th>Quantity</Th>
              <Th>Date & Time</Th>
              <Th>Location</Th>
              </Tr>
          </Thead>
          <Tbody>
            {t.order.map((b)=>{
              return <Tr>
              <Td>{t.firstName+" "+t.lastName}</Td>
              <Td>{b.BookName}</Td>
              <Td>{b.Price}</Td>
              <Td>{b.Quantity}</Td>
              <Td>{window.getTimeStamp(t.dateAddedInFav)}</Td>
              <Td>{t.cityName}</Td>
            </Tr>
            })}
          </Tbody>
        </Table>
        </>
})
)
:
<>
<h2 className='text-center'>You don't have Any Orders</h2>
<p className='text-center'>Click Here <Link to="/shops">Shop</Link> If You Want to Buy Something</p>
</>
}
          </>)}
</div>
</div>
)
}
