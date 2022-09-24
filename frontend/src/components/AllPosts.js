import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { Card } from "react-bootstrap"

function AllPosts({ user }) {
  const serverUrl = "http://127.0.0.1:8000"
  const [allPostsData, setAllPostsData] = useState(null)
  const [followingList, setFollowingList] = useState({following: []})
  let following = followingList["following"]
  const [followingPosts, setFollowingPosts] = useState({posts: []})
  let posts = followingPosts["posts"]
  const [knownPosts, setKnownPosts] = useState({posts: []})
  let [gambiarra, setGambiarra] = useState({item: []})

  useEffect(() => {
    if(!user){
      fetch("http://127.0.0.1:8000/api/post-list")
      .then((res) => res.json())
      .then((data) => {
        setAllPostsData(data)
        console.log(data)
      })
    }
    else{
      fetch("http://127.0.0.1:8000/api/get-posts-of-following/" + user)
      .then((res) => res.json())
      .then((data) => {
        if(data){
          data.forEach((data) => {
            if(!following.includes(data.user)){
              following.push(data.user)
            }
            setFollowingList({following: following})
            // console.log(followingList)
          });
        }
        following.forEach((user) => {
          fetch("http://127.0.0.1:8000/api/get-post/" + user)
          .then((res) => res.json())
          .then((data) => {
            // console.log(data)
            posts.push(data)
            setFollowingPosts({posts: posts})
            // setAllPostsData(followingPosts["posts"])



            posts.forEach((post) => {
              console.log(post)
              post.forEach((element) => {
                
                if(!knownPosts["posts"].includes(element)){
                  gambiarra["item"].push(element)

                  
                  
                  const filteredArr = gambiarra["item"].reduce((acc, current) => {
                    const x = acc.find(item => item.id === current.id);
                    if (!x) {
                      setAllPostsData(acc.concat([current]))
                      console.log("okkkkkkk")
                      return acc.concat([current]);
                    } else {
                      return acc;
                    }
                  }, []);

                  filteredArr.forEach((item) => {
                    knownPosts["posts"].push(item)
                  })

                  console.log(filteredArr)
                  console.log(knownPosts["posts"])
                }
                
              })
            })


          })
        },
        console.log('slaaaaaa')
        )
        

      })
    }


  }, [user]) // updates whenever the user changes

  return (
    <div className="center mt-3">
      { allPostsData ? allPostsData.map((post, index) => (
        
        <div 
          className="center center-posts m-2" 
          style={{minWidth: '30%', maxWidth: '400px'}} 
          key={ index }>
            <Card>
              <div className="d-flex align-items-center flex-column">
                <Card.Img 
                  variant="top" 
                  src={serverUrl+post.photo} 
                  style={{width: '100%'}}></Card.Img>
              </div>

              <Card.Body>
                <Link to={"/profile/" + post.author}>
                  <Card.Title>@{ post.author }</Card.Title>
                </Link>
                <Card.Text>{ post.description }</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">{ post.created_at }</Card.Footer>
            </Card>
          </div>
      )) : <p>No posts to display</p> }
    </div>
  )
}

export default AllPosts