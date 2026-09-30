import {useNavigate} from 'react-router-dom'
import { Button, Container, Row , Col ,Form,Table} from "react-bootstrap";
import {useEffect ,useState} from 'react'
const apiUrl = import.meta.env.VITE_API_URL
import axios from 'axios'
function DiscountList(){
    let [discounts,setDiscounts] = useState([])
    const navigate = useNavigate()
    function goToAddDiscount(){
        navigate('/add/discount')
    }
    function goForEdit(id){
        navigate('/edit/discount/' +id)
    }
    useEffect(()=>{
        axios({
            url: apiUrl +'/discounts',
            method: 'get'
        }).then((res)=>{
            setDiscounts(res.data.data)
        }).catch((err)=>{
            alert(err)
        })
    },[])
    return(
        <Container>
            <Row>
                <Col>
                <Form>
                    <Form.Group>
                        <Form.Control type="text" placeholder="type book name to search"></Form.Control>
                    </Form.Group>
                </Form>
                <Button className="mt-5" variant = "success" style={{float:'right' }} onClick={goToAddDiscount}>add discount</Button>
                </Col>
            </Row>
            <Row>
                <h3 className='mt-2 text-center text-danger'>Discounts List</h3>
                <Table borderd hover>
                    <thead>
                        <tr>
                            <th>Discount Name</th>
                            <th>Discount Type</th>
                            <th>Discount Value</th>
                            <th>Book Name</th>
                            <th>Valid Form</th>
                            <th>Valid To</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            discounts.map((discount)=>
                            <tr>
                                <td>{discount.discountName}</td>
                                <td>{discount.discountType}</td>
                                <td>{discount.discountValue}</td>
                                <td>{discount.bookTitle}</td>
                                <td>{new Date(discount.validFrom).toLocaleDateString("en-GB")}</td>
                                <td>{new Date(discount.validTo).toLocaleDateString("en-GB")}</td>
                                <td className={discount.status === "Active" ? "text-success" : "text-danger"}>{discount.status}</td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={()=>goForEdit(discount._id)}><i className="bi bi-pencil"></i></Button>
                                </td>
                            </tr>
                        )
                        }
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}
export default DiscountList