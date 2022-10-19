import { useState, useEffect } from "react";

import styles from "./blog.module.scss";

const blog = (props) =>{
  const [user, setUser] = useState(props.user || []);
  const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetch("https://jsonplaceholder.typicode.com/users");
//       const users = await data.json();
//       console.log(users);
//     };

//     // call the function
//     fetchData()
//       // make sure to catch any error
//       .catch(console.error);
//   }, []);


    useEffect(()=> {
        setLoading(true)
    }, [props.user]);

    useEffect(()=> {
        setLoading(false)
    }, [props.user]);

  return (
    <>
      <div className={styles.div}>BLOG</div>
      {loading ? (
        <div>LOADING...</div>
      ) : user && user.map((data, index) => (
        <>
            <div>{data.title}</div>
        </>
      ))}
    </>
  );
};

export default blog;

export async function getServerSideProps(context) {
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/photos");
    const users = await data.json();
    return { props: { user: users } };

    // await axios
    //   .get(`http://localhost/yarnapi/getdatablog`)
    //   .then((response) => {
    //     console.log(response);
    //     // setblog(response.data.blog);
    //     const ea = response.data.blog;
    //     return { props: { user: ea } };
    //   })
    //   .catch((error) => {
    //     // console.log(error);
    //   });

  } catch (err) {
    return { props: { user: [] } };
  }
}
