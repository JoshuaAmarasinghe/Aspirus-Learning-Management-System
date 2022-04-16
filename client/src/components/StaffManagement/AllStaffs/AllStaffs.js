import React,{useEffect, useState} from 'react'
import { useLocation } from 'react-router';
import './AllStaffs.css'
import axios from 'axios'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {blue} from '@material-ui/core/colors';

function AllStaffs() {

  const [staffs, setStaffs] = useState([])
  const location = useLocation()

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => { 

    async function getAllStaffs() {
      axios.post(`http://localhost:8070/staff`).then((res) => {
        setStaffs(res.data.result)
      }).catch((error) => {
        alert("Failed to fetch staff members")
      })
    }
    getAllStaffs()
  }, [location])

  function filterContent(data, searchTerm){
    const result = data.filter((staff) => 
        staff.name.toLowerCase().includes(searchTerm) ||
        staff.role.toLowerCase().includes(searchTerm)
    )
    setStaffs(result)
  }

  function handleSearch(event){
    const searchTerm = event.currentTarget.value
    axios.post(`http://localhost:8070/staff`).then((res) => {
      filterContent(res.data, searchTerm.toLowerCase())
    }).catch((error) => {
      alert("Failed to search staff members")
      console.log(error)
    })
  }

    return (
      <div>
        <div className="row">
          <div className="col-4" >
            <div align="center">
                <h1>Meet Our Staff</h1>
            </div>
          </div>
          <div className="col-3">
          </div>
          <div className="col-5">
            <div className="px-3 search" align="center">
              <input 
                type="text" 
                name="search" 
                id="search"
                placeholder="Search" 
                onChange={handleSearch} 
                required 
              />
            </div>
          </div>
        </div>
        <Carousel wipeable={true}  responsive={responsive} autoPlay={true} autoPlaySpeed={2000} infinite={true} className="px-5 py-5 mb-2"> 
          {staffs.map((Staff,key)=>( 
              <div key={key}> 
                  <div className="staffsCard">
                      <div className="StaffsImg">
                        {Staff.imgUrl === ""? 
                          <img src="/images/avatar.jpg" className="staffsImgHeight" alt="staff"/>
                        :
                          <img src={`${Staff.imgUrl}`} className="staffsImgHeight" alt="staff"/>
                        }
                      </div>
                      <div className="p-3">
                          <h6>{Staff.name}</h6>
                          <h6 style={{color:blue[500]}}>{Staff.role}</h6>
                      </div>
                  </div>
              </div>
          ))}
        </Carousel>
      </div>
    )
}

export default AllStaffs